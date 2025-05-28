"use client";

import { Button } from "@/components/ui/button";
import { Settings, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function ProjectViewSwitcher({
  workspace,
  project,
}: {
  workspace: string;
  project: string;
}) {
  const pathname = usePathname();
  const basePath = `/${workspace}/${project}`;
  const isOverview = pathname === basePath;
  const isSettings = pathname === `${basePath}/settings`;

  return (
    <div className="bg-background">
      <div className="px-4 sm:px-6 py-6">
        <div className="hidden md:flex items-center gap-4">
          <Link href={basePath}>
            <Button
              size="lg"
              className={clsx(
                "gap-3 text-base px-6 py-3 cursor-pointer",
                isOverview ? "font-semibold" : "font-normal",
                isOverview ? "" : "border border-muted"
              )}
              variant={isOverview ? "default" : "outline"}
            >
              <LayoutDashboard className="h-5 w-5" />
              Overview
            </Button>
          </Link>
          <Link href={`${basePath}/settings`}>
            <Button
              size="lg"
              className={clsx(
                "gap-3 text-base px-6 py-3 cursor-pointer",
                isSettings ? "font-semibold" : "font-normal",
                isSettings ? "" : "border border-muted"
              )}
              variant={isSettings ? "default" : "outline"}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
