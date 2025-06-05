import { useEffect, useState, useCallback, useMemo } from "react";
import { filterProjects, sortProjects } from "@/lib/utils/workspace-page-utils";
import { useProjects } from "./use-projects";
import { SortKey } from "@/types/types";

export function useProjectSearch(workspace: string) {
  const { projects: initialProjects, loading: initialLoading, error } = useProjects(workspace);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortAscending, setSortAscending] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  const [filteredProjects, setFilteredProjects] = useState(initialProjects);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProjects(initialProjects);
    }
  }, [initialProjects, searchTerm]);

  useEffect(() => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    const timeout = setTimeout(() => {
      const result = filterProjects(initialProjects, searchTerm);
      setFilteredProjects(result);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, initialProjects]);

  const sortedProjects = useMemo(() => {
    return sortProjects(filteredProjects, sortKey, sortAscending);
  }, [filteredProjects, sortKey, sortAscending]);

  const handleSortChange = useCallback((value: string) => {
    const [key, direction] = value.split("-") as [SortKey, "asc" | "desc"];
    setSortKey(key);
    setSortAscending(direction === "asc");
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleProjectSelect = useCallback((projectId: string) => {
    console.log(`Selected project: ${projectId}`);
  }, []);

  return {
    searchTerm,
    initialProjects,
    sortAscending,
    commandOpen,
    sortedProjects,
    setSearchTerm: handleSearchChange,
    setSortOption: handleSortChange,
    setCommandOpen,
    onProjectSelect: handleProjectSelect,
    loading: initialLoading || isSearching,
    error,
    selectedSort,
    setSelectedSort,
  };
}
