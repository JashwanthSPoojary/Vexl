import DeploymentHeader from "@/components/pages/deployments/DeploymentHeader";
import { LogsViewer } from "@/components/pages/deployments/LogViewer";
import db from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const build_id = (await params).id;
  const profile = await db.deployment.findUnique({
    where:{
      buildId:build_id
    },
    select:{
      projectName:true,
      workspaceSlug:true
    }
  });
  if(!profile){
    // change this
    return <div> no data available or no profile</div>
  }

  return (
    <div className="flex flex-col bg-background">
      <div className="px-4 py-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <DeploymentHeader profile={profile} />
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          <LogsViewer buildId={build_id}  />
        </div>
      </div>
    </div>
  );
}
