"use server"

import db from "@/lib/prisma"
import { extractRepoFromUrl, getIconColor } from "@/lib/utils/workspace-page-utils"
import { Project } from "@/types/types"

export async function getDeploymentsByWorkspace(workspaceSlug: string): Promise<false|Project[]> {
  try {
    const deployments = await db.deployment.findMany({
      where: { workspaceSlug },
      orderBy: { createdAt: "desc" },
    });

    return deployments.map((d) => ({
      id: d.id,
      name: d.projectName,
      url: d.deployUrl ?? "",
      icon: d.projectName[0]?.toUpperCase() || "P",
      iconBg: getIconColor(d.id),
      repo: extractRepoFromUrl(d.repoUrl),
      createdAt: d.createdAt.toISOString(),
    }))
  } catch (error) {
    console.error(`Failed to fetch deployments for workspace: ${workspaceSlug}`, error)
    return false
  }
}
