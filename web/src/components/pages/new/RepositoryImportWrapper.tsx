import { getAllRepos } from "@/actions/repos";
import { transformGitHubRepo } from "@/lib/utils/new-workspace-page-utils";
import RepositoryImport from "./RepositoryImport";
import { use } from "react";

export default function RepositoryImportWrapper() {
  const res = use(getAllRepos()); 
  const formattedRepos = res.success ? res.data.map(transformGitHubRepo) : [];
  return <RepositoryImport initialRepos={formattedRepos} />;
}
