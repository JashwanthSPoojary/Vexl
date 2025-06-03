import { Star, GitFork, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Repo } from "@/types/types";
import Link from "next/link";

export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div className="rounded-lg border px-4 py-4 hover:shadow-sm transition">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-base">{repo.name}</h3>
            <span className="text-xs text-muted-foreground border rounded px-2 py-0.5">
              {repo.isPrivate ? "Private" : "Public"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {repo.description}
          </p>
        </div>
        <Link
          href={{
            pathname: "/new/deploy",
            query: {
              repoUrl: repo.clone_url,
              repoName: repo.name,
              repoOwner: repo.repoOwner, 
              defaultBranch: repo.defaultBranch, 
            },
          }}
        >
          <Button  size="sm" variant="outline" className="cursor-pointer !bg-foreground text-background hover:text-background/60">
            Import
          </Button>
        </Link>
      </div>

      <div className="flex gap-4 text-xs text-muted-foreground mt-3 flex-wrap">
        <div className="flex items-center gap-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: repo.languageColor }}
          />
          <span>{repo.language}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3" />
          <span>{repo.stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="h-3 w-3" />
          <span>{repo.forks}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{repo.time}</span>
        </div>
      </div>
    </div>
  );
}
