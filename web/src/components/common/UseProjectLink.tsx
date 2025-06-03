"use client";

import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Props {
  githubUsername?: string;
}

export function UserProjectsLink({ githubUsername }: Props) {
    const { resolvedTheme } = useTheme();
      const [mounted, setMounted] = useState(false);

  const iconFill = resolvedTheme === "dark" ? "fill-white" : "fill-black";
  // This ensures the component only renders after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-6 w-32 animate-pulse bg-muted rounded" />; 
  return (
    <Link
      href={githubUsername ? `/${githubUsername}` : "/"}
      className="flex items-center gap-1 text-base sm:text-lg font-semibold tracking-wide text-foreground cursor-pointer min-w-0"
    >
      <LayoutGrid className={`${iconFill} flex-shrink-0`} />
      <span className="mx-1 text-muted-foreground select-none flex-shrink-0">/</span>
      <span
        className="truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]"
        title={githubUsername || "Projects"}
      >
        {githubUsername || "Projects"}
      </span>
      {githubUsername && (
        <span className="ml-1 flex-shrink-0">Projects</span>
      )}
    </Link>
  );
}
