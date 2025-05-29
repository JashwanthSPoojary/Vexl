import ClientPage from "@/components/pages/deployments/ClientPage";
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
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-4xl space-y-6">
        <ClientPage buildId={build_id} profile={profile} />
      </div>
    </div>
  );
}
