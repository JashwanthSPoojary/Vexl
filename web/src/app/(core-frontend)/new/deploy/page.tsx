import DeployForm from "@/components/pages/new_deploy/DeployForm";
import DeployHeader from "@/components/pages/new_deploy/DeployHeader";
import Image from "next/image";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    repoUrl?: string;
    repoName?: string;
    repoOwner?: string;
    defaultBranch?: string;
  }>;
}) {
  const { repoUrl, repoName, repoOwner, defaultBranch } = await searchParams;

  if (!repoUrl || !repoName || !repoOwner || !defaultBranch) {
    return (
      <div>
        Missing repository information. Please go back and select a repository.
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-background">
      <div className="px-4 py-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <DeployHeader />
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          <DeployForm
            repo_url={repoUrl}
            initial_name={repoName}
            repo_owner={repoOwner}
            default_branch={defaultBranch}
          />
        </div>
      </div>
    </div>
  );
}
