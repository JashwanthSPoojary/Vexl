"use client";
import { SearchBar } from "./SearchBar";
import { useProjectSearch , sortOptions } from "@/hooks/use-project-search";
import { CommandBox } from "./CommandBox";
import { SortDropdown } from "./SortDropdown";
import { AddNewButton } from "./AddNewButton";
import { ProjectsGrid } from "./ProjectsGrid";

export default function ProjectDashboard() {
  const {
    searchTerm,
    sortedProjects,
    commandOpen,
    setSearchTerm,
    setSortOption,
    setCommandOpen,
    onProjectSelect,
  } = useProjectSearch();
  return (
    <div className="container mx-auto px-8  md:px-16 py-8">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search projects..."
              onCommandOpen={() => setCommandOpen(true)}
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <SortDropdown
              options={sortOptions}
              value={`${sortOptions[0].value}`}
              onChange={setSortOption}
              className="flex-1 sm:flex-none"
            />
            <AddNewButton
              className="flex-1 sm:flex-none"
            />
          </div>
        </div>
      </div>
      <ProjectsGrid projects={sortedProjects} />
      <CommandBox open={commandOpen} onOpenChange={setCommandOpen} onSelect={onProjectSelect} />
    </div>
  );
}
