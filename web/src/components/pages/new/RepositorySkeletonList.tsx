export default function RepositorySkeletonList({ count = 4 }: { count?: number }) {
  return (
    <div className="max-w-5xl mx-auto">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border p-4 space-y-2"
        >
          <div className="h-5 w-1/3 bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted/60 rounded" />
        </div>
      ))}
    </div>
  );
}

