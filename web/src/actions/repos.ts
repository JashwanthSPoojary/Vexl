"use server";
import { authOptions } from "@/lib/authoptions";
import { Octokit } from "@octokit/rest";
import { getServerSession } from "next-auth";
import pLimit from "p-limit";
import { redis } from "@/lib/redis";

interface RepoFetchResult {
  success: boolean;
  message: string;
  data: any[];
}

export async function getAllRepos(forceRefresh:boolean = false): Promise<RepoFetchResult> {
  const session = await getServerSession(authOptions);
  const access_token = session?.user.github_access_token;
  const githubUsername = session?.user.github_username;

  if (!session || !access_token || !githubUsername) {
    return {
      success: false,
      message: "No session or access token",
      data: [],
    };
  }

  const cacheKey = `react-repos:${githubUsername}`;
  if (!forceRefresh) {
  const cached = await redis.get(cacheKey);
  if (cached) {
    return {
      success: true,
      message: "Fetched React repositories from cache",
      data: JSON.parse(cached),
    };
  }
}

  const octokit = new Octokit({
    auth: access_token,
  });

  try {
    const allRepos = await octokit.paginate(
      octokit.repos.listForAuthenticatedUser,
      {
        visibility: "all",
        sort: "updated",
        per_page: 100,
        headers: {
          accept: "application/vnd.github.mercy-preview+json", // enables topics
        },
        affiliation: "owner",
      }
    );
    const filtered = allRepos.filter(
      (repo) =>
        !repo.fork &&
        ["JavaScript", "TypeScript", "CSS"].includes(repo.language || "") 
    );

    const limit = pLimit(5);
    const reactRepos = await Promise.all(
      filtered.map((repo) =>
        limit(async () => {
          try {
            const { data: packageFile } = await octokit.repos.getContent({
              owner: repo.owner.login,
              repo: repo.name,
              path: "package.json",
              ref: repo.default_branch,
            });

            if (!("content" in packageFile)) return null;

            const content = Buffer.from(packageFile.content, "base64").toString(
              "utf-8"
            );
            const pkg = JSON.parse(content);
            const deps = { ...pkg.dependencies, ...pkg.devDependencies };

            if (deps?.react && !deps?.next) {
              return repo;
            }
            return null;
          } catch (err: any) {
            if (err.status !== 404) {
              console.error(
                `Error reading package.json in ${repo.full_name}: ${err.message}`
              );
            }
            return null;
          }
        })
      )
    );
    const validRepos = reactRepos.filter(Boolean);
    await redis.set(cacheKey, JSON.stringify(validRepos), "EX", 600);
    return {
      success: true,
      message: "Fetched React repositories from GitHub and cached",
      data: validRepos,
    };
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return {
      success: false,
      message: "Internal Server Error",
      data: [],
    };
  }
}
