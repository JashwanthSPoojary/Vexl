import { Octokit } from "@octokit/rest";

export async function getAllRepos(access_token: string) {
  const octokit = new Octokit({
    auth: access_token,
  });

  let page = 1;
  const perPage = 100;
  let allRepos: any[] = [];
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      const { data, headers } = await octokit.repos.listForAuthenticatedUser({
        visibility: "all",
        sort: "updated",
        per_page: perPage,
        page,
      });

      allRepos = allRepos.concat(data);

      const linkHeader = headers.link || "";
      hasNextPage = linkHeader.includes('rel="next"');
      page += 1;
    }

    return allRepos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}
