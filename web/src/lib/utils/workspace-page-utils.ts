import type { Project, SortKey, SortOption } from "@/types/types"

export function sortProjects(projects: Project[], sortKey: SortKey, ascending = true): Project[] {
  const sortedProjects = [...projects]

  return sortedProjects.sort((a, b) => {
    let comparison = 0

    switch (sortKey) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "url":
        comparison = (a.url ?? "").localeCompare(b.url ?? "")
        break
      case "date":
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        comparison = dateA - dateB
        break
      default:
        comparison = 0
    }

    return ascending ? comparison : -comparison
  })
}
export function filterProjects(projects: Project[], searchTerm: string): Project[] {
  if (!searchTerm) return projects

  const lowerCaseSearchTerm = searchTerm.toLowerCase()

  return projects.filter((project) => {
    return (
      project.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      (project.url?.toLowerCase().includes(lowerCaseSearchTerm) ?? false) ||
      project.repo.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })
}
export function getIconColor(seed: string): string {
  const colors = ["#FF5722", "#4CAF50", "#2196F3", "#9C27B0", "#FFC107"]
  const hash = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}
export function extractRepoFromUrl(url: string): string {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean)
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : url
  } catch {
    return url
  }
}
export const sortOptions: SortOption[] = [
  { label: "Sort by name (A-Z)", value: "name-asc" },
  { label: "Sort by name (Z-A)", value: "name-desc" },
  { label: "Sort by newest", value: "date-desc" },
  { label: "Sort by oldest", value: "date-asc" },
]
