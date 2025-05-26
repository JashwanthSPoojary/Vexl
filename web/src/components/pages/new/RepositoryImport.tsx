// app/components/pages/new/RepositoryImport.tsx
"use client";

import RepositoryImportHeader from "./RepositoryImportHeader";
import RepositoryImportFilters from "./RepositoryImportFilters";
import RepositoryImportBody from "./RepositoryImportBody";
import { useRepos } from "@/hooks/use-github-repos";
import RepositorySkeletonList from "./RepositorySkeletonList";

export default function RepositoryImport({
  access_token,
}: {
  access_token: string | undefined;
}) {
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
  } = useRepos(access_token as string);

  return (
    <div className="flex flex-col bg-background">
      <div className="px-4 py-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <RepositoryImportHeader />
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
        {loading ? (
          <RepositorySkeletonList/>
        ) : (
          <RepositoryImportBody
            paginatedRepos={repos}
            page={currentPage}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}

