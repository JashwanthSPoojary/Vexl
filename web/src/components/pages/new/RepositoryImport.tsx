"use client";
import RepositoryImportHeader from "./RepositoryImportHeader";
import RepositoryImportFilters from "./RepositoryImportFilters";
import RepositoryImportBody from "./RepositoryImportBody";
import { useRepos } from "@/hooks/use-github-repos";
import { Repo } from "@/types/types";
import RepositoryRefreshButton from "./RepositoryRefreshButton";
import RepositorySkeletonImportBody from "./RepositorySkeletonImportBody";

export default function RepositoryImport({ initialRepos }: { initialRepos: Repo[] }) {
  const {
    repos,
    totalPages,
    currentPage,
    setPage,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    loading,
    refetch
  } = useRepos(initialRepos);

  return (
    <div className="flex flex-col bg-background mb-10 sm:mb-4 lg:mb-0">
      <div className="px-4 py-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <RepositoryImportHeader />
            <RepositoryRefreshButton onRefresh={refetch} />
          </div>
          <RepositoryImportFilters
            searchQuery={searchQuery}
            setSearchQuery={(val) => {
              setSearchQuery(val);
              setPage(1);
            }}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {loading?<RepositorySkeletonImportBody/>:<RepositoryImportBody
            paginatedRepos={repos}
            page={currentPage}
            totalPages={totalPages}
            setPage={setPage}
          />}
      </div>
    </div>
  );
}

