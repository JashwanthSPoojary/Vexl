import { getAllRepos } from "@/actions/repos";
import RepositoryImport from "@/components/pages/new/RepositoryImport";
import RepositorySkeletonList from "@/components/pages/new/RepositorySkeletonList";
import { transformGitHubRepo } from "@/lib/utils/new-workspace-page-utils";
import { Suspense } from "react";
export default async function Page() {
  const res = await getAllRepos();
  const formattedRepos = res.success ? res.data.map(transformGitHubRepo) : [];
  return <Suspense fallback={<RepositorySkeletonList />}>
      <RepositoryImport initialRepos={formattedRepos} />
    </Suspense>
}
