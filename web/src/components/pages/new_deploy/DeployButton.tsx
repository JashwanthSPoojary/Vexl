import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export function DeployButton({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="w-full cursor-pointer text-lg font-semibold py-3"
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader className="h-5 w-5 animate-spin" />
          Deploying...
        </div>
      ) : (
        "Deploy"
      )}
    </Button>
  );
}
