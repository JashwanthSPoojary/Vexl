import { DeploymentInfo } from "@/components/pages/project/DeploymentInfo";
import DeploymentLinks from "@/components/pages/project/DeploymentLinks";
import { DeploymentPreview } from "@/components/pages/project/DeploymentPreview";
import { DeploymentTabs } from "@/components/pages/project/DeploymentTabs";
import db from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: Promise<{ workspace:string ,project: string }>;
}) {
  const { project , workspace } = await params;
  const data = await db.deployment.findFirst({
    where:{
      workspaceSlug:workspace,
      projectName:project
    }
  });    
  if(!data){
    // change this
    return <div>no data available</div>
  }
  return (
    <>
      <DeploymentTabs />
      <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 sm:p-6">
        <DeploymentPreview subdomain={data.alternativeDeployUrl} />
        <DeploymentInfo data={data} />
      </div>
      <DeploymentLinks github_url={data.repoUrl} deploy_url={data.alternativeDeployUrl}/>
    </>
  );
}
