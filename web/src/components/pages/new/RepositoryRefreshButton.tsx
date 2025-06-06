"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { tree } from "next/dist/build/templates/app-page";
import { useState } from "react";

interface Props {
  onRefresh: (forceRefresh?: boolean) => Promise<void>;
}

export default function RepositoryRefreshButton({ onRefresh }: Props) {
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await onRefresh(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefresh}
      disabled={loading}
      className="gap-1 !bg-background cursor-pointer"
    >
      <RotateCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
      <span className="hidden sm:inline">
        {loading ? "Refreshing..." : "Refresh"}
      </span>
    </Button>
  );
}
