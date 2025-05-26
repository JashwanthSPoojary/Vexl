import type { Project } from "@/types/types"

export type SortKey = "name" | "date" | "url"

export function sortProjects(projects: Project[], sortKey: SortKey, ascending = true): Project[] {
  const sortedProjects = [...projects]

  return sortedProjects.sort((a, b) => {
    let comparison = 0

    switch (sortKey) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "url":
        comparison = a.url.localeCompare(b.url)
        break
      case "date":
        // Convert dates to timestamps for comparison
        const dateA = getDateFromString(a.lastCommit.date)
        const dateB = getDateFromString(b.lastCommit.date)
        comparison = dateA.getTime() - dateB.getTime()
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
      project.url.toLowerCase().includes(lowerCaseSearchTerm) ||
      project.repo.toLowerCase().includes(lowerCaseSearchTerm) ||
      project.lastCommit.message.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })
};

// Helper function to convert date strings to Date objects
function getDateFromString(dateStr: string): Date {
  // Handle relative dates like "2d ago"
  if (dateStr.includes("ago")) {
    const now = new Date()
    const match = dateStr.match(/(\d+)([dhm])/)

    if (match) {
      const value = Number.parseInt(match[1])
      const unit = match[2]

      if (unit === "d") {
        now.setDate(now.getDate() - value)
      } else if (unit === "h") {
        now.setHours(now.getHours() - value)
      } else if (unit === "m") {
        now.setMinutes(now.getMinutes() - value)
      }

      return now
    }
  }

  // Handle month names like "Apr 16"
  if (dateStr.match(/[A-Za-z]{3} \d{1,2}/)) {
    const [month, day] = dateStr.split(" ")
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthIndex = months.findIndex((m) => m === month)

    if (monthIndex !== -1) {
      const now = new Date()
      return new Date(now.getFullYear(), monthIndex, Number.parseInt(day))
    }
  }

  // Handle dates like "5/13/24"
  if (dateStr.match(/\d{1,2}\/\d{1,2}\/\d{2,4}/)) {
    return new Date(dateStr)
  }

  // Default to current date if format is unknown
  return new Date()
}
