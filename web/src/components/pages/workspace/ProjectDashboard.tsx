"use client";
import { SearchBar } from "./SearchBar";
import { useProjectSearch} from "@/hooks/use-project-search";
import { CommandBox } from "./CommandBox";
import { SortDropdown } from "./SortDropdown";
import { AddNewButton } from "./AddNewButton";
import { ProjectsGrid } from "./ProjectsGrid";
import SkeletonProjectsCard from "./SkeletonProjectsCard";
import { sortOptions } from "@/lib/utils/workspace-page-utils";

export default function ProjectDashboard({workspace}:{workspace:string}) {
  const {
    searchTerm,
    sortedProjects,
    commandOpen,
    setSearchTerm,
    setSortOption,
    setCommandOpen,
    onProjectSelect,
    loading,
    selectedSort,
    setSelectedSort
  } = useProjectSearch(workspace);
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
              isLoading={loading}
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <SortDropdown
              options={sortOptions}
              value={`${sortOptions[0].value}`}
              onChange={setSortOption}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              className="flex-1 sm:flex-none !bg-background"
            />
            <AddNewButton
              className="flex-1 sm:flex-none"
            />
          </div>
        </div>
      </div>
      {loading?<SkeletonProjectsCard/>:<ProjectsGrid projects={sortedProjects} workspace={workspace} />}
      <CommandBox workspace={workspace} open={commandOpen} onOpenChange={setCommandOpen} onSelect={onProjectSelect} />
    </div>
  );
}
