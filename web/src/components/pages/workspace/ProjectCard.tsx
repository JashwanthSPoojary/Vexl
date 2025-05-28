import { Github, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Project } from "@/types/types"
import { ProjectIcon } from "./ProjectIcon"
import Link from "next/link"

interface ProjectCardProps {
  project: Project
  workspace:string
}

export function ProjectCard({ project , workspace }: ProjectCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <ProjectIcon icon={project.icon} background={project.iconBg} size="sm" />
            <div>
              <Link href={`/${workspace}/${project.name}`}>
              <h3 className="font-medium text-card-foreground text-sm sm:text-base cursor-pointer">
                {project.name}
              </h3>
              </Link>
              <p className="text-xs sm:text-sm text-muted-foreground cursor-pointer">
                {project.url ?? "No deployment URL"}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 rounded-full">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {project.url && (
                  <DropdownMenuItem onClick={() => window.open(project.url!, "_blank")}>
                    Visit
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {project.repo && (
          <div className="flex items-center mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
            <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            <span className="truncate">{project.repo}</span>
          </div>
        )}

        <div className="mt-3 sm:mt-4 text-xs text-muted-foreground">
          Created at: {project.createdAt}
        </div>
      </div>
    </div>
  )
}
