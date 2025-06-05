import { Button } from "@/components/ui/button";
import { LucideGithub } from "lucide-react";
import Link from "next/link";

export default function DeploymentLinks({github_url,deploy_url}:{github_url:string,deploy_url:string|null}) {
    const domain = process.env.NEXT_PUBLIC_DEPLOY_DOMAIN ?? "localhost:3002";
  const url = `http://${deploy_url}.${domain}`;
  return (
<div className="bg-background">
  <div className="px-4 sm:px-6 py-6">
    <div className="hidden md:flex items-center gap-4">
      <Link href={github_url} target="_blank">
        <Button
          size="lg"
          className="gap-3 text-base px-6 py-3 cursor-pointer border border-muted"
          variant="outline"
        >
          <LucideGithub className="h-5 w-5" />
          Repository
        </Button>
      </Link>
      {/* change this */}
      <Link href={url} target="_blank">
        <Button
          size="lg"
          className="gap-3 text-base px-6 py-3 cursor-pointer"
          variant="default"
        >
          Visit
        </Button>
      </Link>
    </div>
  </div>
</div>
  );
}
