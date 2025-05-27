import { useState, useCallback, useEffect, useMemo } from "react";
import type { Repo } from "@/types/types";
import { sortRepos, transformGitHubRepo } from "@/lib/utils/new-workspace-page-utils";
import { getAllRepos } from "@/actions/repos";

export function useRepos(access_token: string | null) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("updated");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const perPage = 3;

  const fetchRepos = useCallback(async () => {
    if (!access_token) return;
    setLoading(true); 
    const rawRepos = await getAllRepos(access_token);
    const formatted = rawRepos.map(transformGitHubRepo);
    setRepos(formatted);
    setLoading(false);
  }, [access_token]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const filteredRepos = useMemo(() => {
    const filtered = repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return sortRepos(filtered, sortBy);
  }, [repos, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredRepos.length / perPage);
  const paginatedRepos = filteredRepos.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return {
    repos: paginatedRepos,
    totalPages,
    currentPage: page,
    setPage,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    loading,
  };
}
