import { Skeleton } from "@/components/ui/skeleton";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SettingsSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 py-6">
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <Button variant="outline" size="sm" className="mb-4" disabled>
          <Menu className="h-4 w-4 mr-2 animate-pulse" />
          <span className="h-4 w-24 bg-muted animate-pulse rounded" />
        </Button>
      </div>

      {/* Sidebar Skeleton */}
      <div className="hidden lg:block w-80 bg-card rounded-lg p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 min-w-0 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
