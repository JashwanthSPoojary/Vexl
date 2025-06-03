export default function RepositorySkeletonList({
  count = 4,
  searchQuery = "",
  setSearchQuery = () => {},
  sortBy = "updated",
  setSortBy = () => {},
  setPage = () => {},
}) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="h-4 w-64 bg-muted/60 rounded" />
      </div>

      <div className="flex flex-col md:flex-row gap-4 animate-pulse">
        <div className="relative w-full md:w-1/2 h-10 bg-muted rounded" />

        <div className="w-40 h-10 bg-muted rounded" />
      </div>

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
