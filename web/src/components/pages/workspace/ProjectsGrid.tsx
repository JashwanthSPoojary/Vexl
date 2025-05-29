import type { Project } from "@/types/types"
import { ProjectCard } from "./ProjectCard"

interface ProjectsGridProps {
  projects: Project[]
  workspace: string
}

export function ProjectsGrid({ projects ,workspace }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-xl font-medium">No projects found</h3>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} workspace={workspace} />
      ))}
    </div>
  )
}
