"use client";

import { deployProject } from "@/actions/deploy";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function DeployForm({
  repo_url,
  initial_name,
}: {
  repo_url: string;
  initial_name: string;
}) {
  const [name, setName] = useState(initial_name);
  const [isDeploying, setIsDeploying] = useState(false);
  const router = useRouter();

  const handleDeploy = async () => {
    try {
      setIsDeploying(true);
      const result = await deployProject(repo_url, name);
      console.log("Deployed:", result);

      if (result?.workspaceSlug && result?.projectName) {
        router.push(`/${result.workspaceSlug}/${result.projectName}`);
      } else {
        console.error("Deployment failed: invalid response", result);
      }
    } catch (err) {
      console.error("Deployment error:", err);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="max-w-xl w-full px-4 sm:px-6 lg:px-8 mx-auto mt-10 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-center">
        Deploy Your React Project
      </h1>

      <div className="space-y-2">
        <Label htmlFor="repo">Repository URL</Label>
        <Input id="repo" value={repo_url} disabled className="w-full" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isDeploying}
          className="w-full"
        />
      </div>

      <Button
        onClick={handleDeploy}
        disabled={isDeploying}
        className="w-full sm:w-auto"
      >
        {isDeploying ? (
          <div className="flex items-center justify-center gap-2">
            <Loader className="h-4 w-4 animate-spin" />
            Deploying...
          </div>
        ) : (
          "Deploy"
        )}
      </Button>
    </div>
  );
}
