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
      url: d.alternativeDeployUrl ?? "",
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
export async function deleteProject(projectName: string, workspaceSlug: string): Promise<{ success: boolean; message?: string }> {
  try {
    const project = await db.deployment.findFirst({
      where: {
        projectName: projectName,
        workspaceSlug,
      },
    });
    if (!project) {
      return { success: false, message: "Project not found." };
    }
    await db.deployment.delete({
      where: {
        id: project.id,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, message: "Internal server error." };
  }
}
