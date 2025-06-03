export default function RepositorySkeletonImportBody({
  count = 4,
  searchQuery = "",
  setSearchQuery = () => {},
  sortBy = "updated",
  setSortBy = () => {},
  setPage = () => {},
}) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border p-4 space-y-2 animate-pulse"
          >
            <div className="h-5 w-1/3 bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted/60 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
