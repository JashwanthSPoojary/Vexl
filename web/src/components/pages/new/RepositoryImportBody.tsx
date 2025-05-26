import { Tabs, TabsContent } from "@/components/ui/tabs";
import RepoList from "./RepoList";
import PaginationControls from "./PaginationControls";
import { Dispatch, SetStateAction } from "react";
import { Repo } from "@/types/types";

export default function RepositoryImportBody({
  paginatedRepos,
  page,
  totalPages,
  setPage,
}: {
  paginatedRepos: Repo[];
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="max-w-5xl mx-auto">
      <Tabs defaultValue="your" className="mt-2">
        <TabsContent value="your">
          <RepoList repos={paginatedRepos} />
          <PaginationControls
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
