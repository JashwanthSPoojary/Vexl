"use server";
import { authOptions } from "@/lib/authoptions";
import { Octokit } from "@octokit/rest";
import { getServerSession } from "next-auth";

interface RepoFetchResult {
  success: boolean;
  message: string;
  data: any[];
}

export async function getAllRepos(): Promise<RepoFetchResult> {
  const session = await getServerSession(authOptions);
  const access_token = session?.user.github_access_token;

  if (!session || !access_token) {
    return {
      success: false,
      message: "No session or access token",
      data: [],
    };
  }

  const octokit = new Octokit({
    auth: access_token,
  });

  try {
    const allRepos = await octokit.paginate(octokit.repos.listForAuthenticatedUser, {
      visibility: "all",
      sort: "updated",
      per_page: 100,
    });

    return {
      success: true,
      message: "Fetched all GitHub repos",
      data: allRepos,
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
