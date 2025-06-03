import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonProjectsCard() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div className="border rounded-lg overflow-hidden !bg-background" key={i}>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-md " />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 sm:w-40" />
              <Skeleton className="h-3 w-24 sm:w-32" />
            </div>
          </div>
          <Skeleton className="h-7 w-7 sm:h-8 sm:w-8 rounded-full" />
        </div>

        <Skeleton className="h-4 mt-3 sm:mt-4 w-3/4" />
        <Skeleton className="h-4 mt-2 w-1/2" />
      </div>
    </div>
      ))}
    </div>
  );
}
