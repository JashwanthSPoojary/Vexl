"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface DeploymentHeaderProps {
  profile: {
    workspaceSlug: string;
    projectName: string;
  };
}

export default function DeploymentHeader({ profile }: DeploymentHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl font-semibold">Watch all your project logs</h1>
        <Link href={`/${profile.workspaceSlug}/${profile.projectName}`}>
          <Button className="w-full sm:w-auto cursor-pointer">
            Checkout <LogOut className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
      <p className="text-muted-foreground text-sm">
        Specifies all major building logs. Also informs about projects building errors.
      </p>
    </div>
  );
}
