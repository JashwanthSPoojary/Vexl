"use server";
import { authOptions } from "@/lib/authoptions";
import { generateId, generateSlug } from "@/lib/utils/delpoy-page-utils";
import db from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { convertEnvArrayToRecord } from "@/lib/utils";
import { DeployProjectResult, EnvVar } from "@/types/types";
import { Octokit } from "@octokit/rest";

export async function deployProject(
  project_name: string,
  repo_url: string,
  repo_name: string,
  repo_owner: string,
  default_branch: string,
  frontend_envs: EnvVar[]
):Promise<DeployProjectResult>{
  const session = await getServerSession(authOptions);
  if (
    !session ||
    !session.user?.github_username ||
    !session.user?.github_access_token
  ) {
    return { success: false, message: "Unauthorized or missing session." , data:{} };
  }
  const github_access_token = session.user.github_access_token;
  const workspaceSlug = session.user.github_username;
  const slug = generateSlug();
  const build_id = generateId();
  if (!slug) {
    return { success: false, message:"Failed to generate slug." ,data:{} };
  }
  const envs = convertEnvArrayToRecord(frontend_envs);
  const octokit = new Octokit({
    auth: github_access_token,
  });

  try {
    const projectNameExists = await db.deployment.findFirst({
      where:{
        projectName:project_name
      }
    });
    if(projectNameExists){
      return { success: false, message:"Cant use Existing project name" ,data:{} };
    }
    const buill_call = await fetch(
      `http://localhost:3001/api/builds/${build_id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repo_url,
          project_id: slug,
          envs,
        }),
      }
    );
    if (buill_call.status !== 202) {
      return { success: false, message:"Failed to queue build process.", data:{} };
    }
    const { data: existingHooks } = await octokit.request(
      "GET /repos/{owner}/{repo}/hooks",
      {
        owner: repo_owner,
        repo: repo_name,
      }
    );
    const webhookUrl =
      "https://48a8-152-58-240-170.ngrok-free.app/api/webhooks/github";
    const existingHook = existingHooks.find(
      (hook) => hook.config?.url === webhookUrl
    );
    let webhook_data;
    if (existingHook) {
      webhook_data = existingHook;
    } else {
      const response = await octokit.request(
        "POST /repos/{owner}/{repo}/hooks",
        {
          owner: repo_owner,
          repo: repo_name,
          name: "web",
          active: true,
          events: ["push"],
          config: {
            url: webhookUrl,
            content_type: "json",
            secret: process.env.GITHUB_WEBHOOK_SECRET,
            insecure_ssl: "0",
          },
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      webhook_data = response.data;
    }

    if (!webhook_data) {
      return {
        success: false,
        message:"GitHub webhook creation failed",
        data: {},
      };
    }
    await db.deployment.create({
      data: {
        projectName: project_name,
        workspaceSlug,
        repoUrl: repo_url,
        repoName: repo_name,
        repoOwner: repo_owner,
        branch: default_branch,
        deployUrl: slug,
        alternativeDeployUrl: slug,
        buildId: build_id,
        status: "queued",
        githubWebhookId: webhook_data.id,
        envs,
      },
    });
    return {
      success: true,
      message:"Deplyment request was successfull",
      data: {
        build_id,
        workspaceSlug,
        projectName: project_name,
        deployUrl: slug,
      },
    };
  } catch (error) {
    console.error("Deployment error:", error);
    return { success: false, message:"Internal server error", data: {}};
  }
}
