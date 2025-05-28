"use client"

import { useState, useCallback, useMemo } from "react"
import { filterProjects, sortProjects } from "@/lib/utils/workspace-page-utils"
import { useProjects } from "./use-projects"
import { SortKey } from "@/types/types";

export function useProjectSearch(workspace:string) {
  const {projects: initialProjects , loading , error} = useProjects(workspace);
  const [searchTerm, setSearchTerm] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("date")
  const [sortAscending, setSortAscending] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState<string>("");
  

  const filteredProjects = useMemo(() => {
    return filterProjects(initialProjects, searchTerm)
  }, [searchTerm,initialProjects]);

  const sortedProjects = useMemo(() => {
    return sortProjects(filteredProjects, sortKey, sortAscending)
  }, [filteredProjects, sortKey, sortAscending])

  const handleSortChange = useCallback((value: string) => {
    const [key, direction] = value.split("-") as [SortKey, "asc" | "desc"]
    setSortKey(key)
    setSortAscending(direction === "asc")
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  const handleProjectSelect = useCallback((projectId: string) => {
    // change this
    console.log(`Selected project: ${projectId}`)
  }, [])

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
    loading,
    error,
    selectedSort,
    setSelectedSort
  }
}
