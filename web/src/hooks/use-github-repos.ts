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

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await getAllRepos();
      if (res.success) {
        const formatted = res.data.map(transformGitHubRepo);
        setRepos(formatted);
        setPage(1);
      }
    } catch (err) {
      console.error("Error refreshing repos:", err);
    } finally {
      setLoading(false);
    }
  };

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
  useEffect(() => {
  setPage(1);
}, [searchQuery, sortBy]);

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
  refresh,
};
}
