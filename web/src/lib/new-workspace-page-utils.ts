import { Repo } from "@/types/types";

export const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Python: "#3572A5",
  default: "#ccc",
};
export function getRelativeTime(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  return `${diffHrs}h ago`;
}
export function transformGitHubRepo(repo: any) {
  return {
    id: repo.id,
    name: repo.name,
    clone_url: repo.clone_url,
    description: repo.description ?? "No description",
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    isPrivate: repo.private,
    time: getRelativeTime(repo.updated_at),
    updated_at: repo.updated_at,
    language: repo.language ?? "Unknown",
    languageColor: languageColors[repo.language] || languageColors.default,
    owner: repo.owner.login,
  };
}
export function sortRepos(repos: Repo[], sortBy: string): Repo[] {
  switch (sortBy) {
    case "stars":
      return [...repos].sort((a, b) => b.stars - a.stars);
    case "forks":
      return [...repos].sort((a, b) => b.forks - a.forks);
    case "updated":
    default:
      return [...repos].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
  }
}
