"use server";
import { authOptions } from "@/lib/authoptions";
import { generateId, generateSlug } from "@/lib/utils/delpoy-page-utils";
import db from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { convertEnvArrayToRecord } from "@/lib/utils";
import { EnvVar } from "@/types/types";

export async function deployProject(
  repo_url: string,
  repo_name: string,
  name: string,
  frontend_envs: EnvVar[]
) {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    !session.user?.github_username ||
    !session.user?.github_access_token
  ) {
    return { success: false, error: "Unauthorized or missing session." };
  }

  const github_access_token = session.user.github_access_token;
  const workspaceSlug = session.user.github_username;
  const slug = generateSlug();
  const build_id = generateId();
  if (!slug) {
    return { success: false, error: "Failed to generate slug." };
  }
  const envs = convertEnvArrayToRecord(frontend_envs);

  try {
    const res = await fetch(`http://localhost:3001/api/builds/${build_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        repo_url,
        project_id: slug,
        envs,
      }),
    });
    await fetch(`https://api.github.com/repos/${workspaceSlug}/${repo_name}/hooks`, {
      method: "POST",
      headers: {
        Authorization: `token ${github_access_token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        name: "web",
        active: true,
        events: ["push"],
        config: {
          url: process.env.GITHUB_WEBHOOK_URL,
          content_type: "json",
          secret: process.env.GITHUB_WEBHOOK_SECRET, // same secret used to verify payloads
        },
      }),
    });

    if (res.status !== 202) {
      return { success: false, error: "Failed to queue build process." };
    }
    await db.deployment.create({
      data: {
        projectName: name,
        workspaceSlug,
        repoUrl: repo_url,
        deployUrl: slug,
        alternativeDeployUrl: slug,
        buildId: build_id,
        status: "queued",
      },
    });

    const data = await res.json();

    return {
      success: true,
      data: {
        build_id: data.build_id,
        workspaceSlug,
        projectName: name,
        deployUrl: slug,
      },
    };
  } catch (error) {
    console.error("Deployment error:", error);
    return { success: false, error: "Internal server error" };
  }
}
