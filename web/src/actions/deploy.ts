"use server";
import { authOptions } from "@/lib/authoptions";
import { generateSlug } from "@/lib/delpoy-page-utils";
import db from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function deployProject(repo_url: string, name: string) {
  const session = await getServerSession(authOptions);
  const workspaceSlug = session?.user.github_username
  const slug = generateSlug();
  if(!workspaceSlug) return
  const deployment = await db.deployment.create({
    data: {
      projectName: name,
      workspaceSlug: workspaceSlug,
      repoUrl: repo_url,
      deployUrl:slug,
      status: "queued",
    },
  });
  const res = await fetch("http://localhost:4000/deploy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: repo_url,
      project_id: deployment.id,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Deployment failed: ${error}`);
  }

  return {
    workspaceSlug,
    projectName: name,
  };
}
