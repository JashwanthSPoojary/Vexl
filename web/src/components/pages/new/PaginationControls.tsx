import { Button } from "@/components/ui/button";

export default function PaginationControls({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages:number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex justify-center gap-3 mt-6">
      <Button
        size="sm"
        variant="outline"
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="cursor-pointer !bg-foreground text-background hover:text-background/60"
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page}
      </span>
      <Button
        size="sm"
        variant="outline"
        disabled={page===totalPages}
        onClick={() => setPage((p) => p + 1)}
        className="cursor-pointer !bg-foreground text-background hover:text-background/60"
      >
        Next
      </Button>
    </div>
  );
}
