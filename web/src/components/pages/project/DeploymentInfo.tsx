import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, Logs } from "lucide-react";
import Link from "next/link";

interface DeploymentInfoProps {
  id: string;
  projectName: string;
  workspaceSlug: string;
  repoUrl: string;
  status: string;
  buildId: string;
  deployUrl: string | null;
  alternativeDeployUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function DeploymentInfo({ data }: { data: DeploymentInfoProps }) {
  const domain = process.env.NEXT_PUBLIC_DEPLOY_DOMAIN ?? "localhost:3002";
  const url = `http://${data.alternativeDeployUrl}.${domain}`;
  return (
    <div className="w-full lg:w-80 space-y-6 text-sm">
      <div>
        <h3 className="text-muted-foreground mb-2">Deployment</h3>
        <div className="flex items-center gap-2">
          <span className="font-mono text-foreground truncate text-xs sm:text-sm">
            {data?.alternativeDeployUrl}
          </span>
          {/* change this */}
          <Link target="_blank" href={url}>
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
              <ExternalLink className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <h3 className="text-muted-foreground mb-2">Project Name</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-foreground truncate text-xs sm:text-sm">
              {data.projectName}
            </span>
            <Copy className="h-3 w-3 text-muted-foreground shrink-0" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <div>
          <h3 className="text-muted-foreground mb-2">Status</h3>
          <div className="flex items-center gap-2">
            {/* change this */}
            <div
  className={`w-2 h-2 rounded-full ${
    data.status === "active"
      ? "bg-green-600"
      : data.status === "queued"
      ? "bg-yellow-500"
      : data.status === "failed"
      ? "bg-red-600"
      : "bg-gray-400"
  }`}
/>
            <span className="text-foreground">{data.status}</span>
          </div>
        </div>

        <div>
          <h3 className="text-muted-foreground mb-2">Created</h3>
          <div className="space-y-1">
            <div className="text-foreground">{"Mar 12 2024"}</div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">by</span>
              <span className="text-foreground truncate">
                {data.workspaceSlug}
              </span>
              <div className="w-4 h-4 rounded-full bg-muted shrink-0" />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Link href={`/new/deploy/${data.buildId}`}>
            <Button className="w-full h-10 text-base justify-start gap-6 cursor-pointer">
              <Logs className="h-5 w-5" />
              Build logs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
