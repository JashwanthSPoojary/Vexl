import { ExternalLink, Github, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Project } from "@/types/types";
import { ProjectIcon } from "./ProjectIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: Project;
  workspace: string;
}

export function ProjectCard({ project, workspace }: ProjectCardProps) {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/${workspace}/${project.name}`);
  };
  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer block border rounded-lg overflow-hidden bg-background hover:shadow transition-shadow"
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <ProjectIcon
              icon={project.icon}
              background={project.iconBg}
              size="sm"
            />
            <div>
              <h3 className="font-medium text-card-foreground text-sm sm:text-base">
                {project.name}
              </h3>

              {project.url ? (
                //change this
                <a
                  href={`http://${project.url}.localhost:3002`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-primary"
                >
                  <span className="truncate">{project.url}</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
              ) : (
                <p className="text-xs sm:text-sm text-muted-foreground">
                  No deployment URL
                </p>
              )}
            </div>
          </div>
        </div>

        {project.repo && (
          <div className="flex items-center mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
            <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            <a
              href={`https://github.com/${project.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 truncate hover:text-primary"
            >
              <span className="truncate">{project.repo}</span>
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            </a>
          </div>
        )}

        <div className="mt-3 sm:mt-4 text-xs text-muted-foreground">
          Created at:{" "}
          {new Date(project.createdAt).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
