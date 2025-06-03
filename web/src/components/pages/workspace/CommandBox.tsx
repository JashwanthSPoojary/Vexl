"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useProjectSearch } from "@/hooks/use-project-search";
import { useRouter } from "next/navigation";

interface CommandBoxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect?: (value: string) => void;
  workspace:string
}

export function CommandBox({ open, onOpenChange, onSelect,workspace }: CommandBoxProps) {
  const { initialProjects: projects } = useProjectSearch(workspace);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle />
      <DialogContent className="p-0 overflow-hidden border-none max-w-2xl">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search projects..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No projects found.
            </Command.Empty>
            <Command.Group heading="Projects">
              {projects.map((project) => (
                <Command.Item
                  key={project.id}
                  value={project.name}
                  onSelect={() => {
                    router.push(`/${workspace}/${project.name}`);
                    onSelect?.(project.id);
                    onOpenChange(false);
                  }}
                  className="flex items-center gap-2 rounded-sm px-4 py-2 text-sm cursor-pointer hover:bg-accent"
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    )}
                    style={{ background: project.iconBg }}
                  >
                    {project.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-foreground">{project.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {project.url}
                    </span>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
