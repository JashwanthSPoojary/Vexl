// app/new/page.tsx
import { Suspense } from "react";
import RepositorySkeletonList from "@/components/pages/new/RepositorySkeletonList";
import RepositoryImportWrapper from "@/components/pages/new/RepositoryImportWrapper";

export default function Page() {
  return (
    <Suspense fallback={<RepositorySkeletonList />}>
      <RepositoryImportWrapper />
    </Suspense>
  );
}
