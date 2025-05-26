import { Repo } from "@/types/types";
import RepoCard from "./RepoCard";

export default function RepoList({ repos }: { repos: Repo[] }) {
  return (
    <div className="flex flex-col gap-3">
      {repos.length > 0 ? (
        repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
      ) : (
        <div className="text-center py-10 text-muted-foreground text-sm">
          No repositories found.
        </div>
      )}
    </div>
  );
}
