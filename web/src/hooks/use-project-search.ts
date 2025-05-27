"use client"

import { useState, useCallback, useMemo } from "react"

import { projects as initialProjects } from "@/lib/data"
import { filterProjects, sortProjects, type SortKey } from "@/lib/utils/workspace-page-utils"

type SortOption = {
  label: string
  value: string
}

export const sortOptions: SortOption[] = [
  { label: "Sort by name (A-Z)", value: "name-asc" },
  { label: "Sort by name (Z-A)", value: "name-desc" },
  { label: "Sort by newest", value: "date-desc" },
  { label: "Sort by oldest", value: "date-asc" },
]

export function useProjectSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortAscending, setSortAscending] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    return filterProjects(initialProjects, searchTerm)
  }, [searchTerm]);

  const sortedProjects = useMemo(() => {
    return sortProjects(filteredProjects, sortKey, sortAscending)
  }, [filteredProjects, sortKey, sortAscending])

  // Handle sort change
  const handleSortChange = useCallback((value: string) => {
    const [key, direction] = value.split("-") as [SortKey, "asc" | "desc"]
    setSortKey(key)
    setSortAscending(direction === "asc")
  }, [])

  // Handle search change
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  // Handle project selection from command box
  const handleProjectSelect = useCallback((projectId: string) => {
    console.log(`Selected project: ${projectId}`)
    // Here you would typically navigate to the project or perform some action
  }, [])

  return {
    searchTerm,
    sortKey,
    sortAscending,
    commandOpen,
    sortedProjects,
    sortOptions,
    setSearchTerm: handleSearchChange,
    setSortOption: handleSortChange,
    setCommandOpen,
    onProjectSelect: handleProjectSelect,
  }
}
