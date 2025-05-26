import DeployForm from "@/components/pages/new_deploy/DeployForm";
import { authOptions } from "@/lib/authoptions";
import { getServerSession } from "next-auth";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ repo: string; name: string }>;
}) {
  const session = await getServerSession(authOptions);
  const workspace = session?.user.github_username;
  const repo_url = (await searchParams).repo;
  const repo_name = (await searchParams).name;

  if (!repo_url || !repo_name) {
    return <div className="text-red-500">Missing repo info</div>;
  }

  return (
    <DeployForm repo_url={repo_url} initial_name={repo_name}/>
  );
}
