"use client";

import { LogsViewer } from "@/components/pages/deployments/LogViewer";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

interface ProfileProp {
   projectName: string;
    workspaceSlug: string;
}
export default function ClientPage({ buildId,profile }: { buildId: string , profile:ProfileProp }) {
  return (
    <>
      <div className="flex justify-between items-center px-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold mb-1">Build Logs</h1>
        <p className="text-muted-foreground text-sm mb-4">
          Live streaming logs from your deployment
        </p>
        </div>
        <Link href={`/${profile.workspaceSlug}/${profile.projectName}`}>
          <Button className="cursor-pointer">Checkout <LogOut/></Button>
        </Link>
      </div>
      <LogsViewer buildId={buildId} />
    </>
  );
}
