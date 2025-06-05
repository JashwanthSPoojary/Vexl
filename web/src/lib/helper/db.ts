import  db  from "@/lib/prisma"

export async function getProjectById(workspace: string, projectName: string) {
  return await db.deployment.findFirst({
    where: {
      workspaceSlug:workspace,
      projectName
    },
    select:{
        projectName:true,
        workspaceSlug:true,
        deployUrl:true,
        alternativeDeployUrl:true
    }
  })
}
