import { useState, useCallback, useEffect, useMemo } from "react";
import type { Repo } from "@/types/types";
import {
  sortRepos,
  transformGitHubRepo,
} from "@/lib/utils/new-workspace-page-utils";
import { getAllRepos } from "@/actions/repos";

export function useRepos(initial: Repo[] = []) {
  const [repos, setRepos] = useState<Repo[]>(initial);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("updated");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(initial.length === 0);
  const perPage = 3;

  const fetchRepos = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    try {
      const result = await getAllRepos(forceRefresh);
      if (result.success) {
        const transformed = result.data.map(transformGitHubRepo);
        setRepos(transformed);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initial.length === 0) {
      fetchRepos();
    }
  }, [fetchRepos, initial.length]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, sortBy]);

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
    refetch: fetchRepos,
  };
}
