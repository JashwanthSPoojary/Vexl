"use client";

import { deployProject } from "@/actions/deploy";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Loader, Plus, Trash2 } from "lucide-react";

export default function DeployForm({
  repo_url,
  initial_name,
}: {
  repo_url: string;
  initial_name: string;
}) {
  const [name, setName] = useState(initial_name);
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [envVars, setEnvVars] = useState([{ key: "", value: "" }]);

  const handleEnvChange = (
    index: number,
    field: "key" | "value",
    newValue: string
  ) => {
    const updated = [...envVars];
    updated[index][field] = newValue;
    setEnvVars(updated);
  };

  const addEnvVar = () => setEnvVars([...envVars, { key: "", value: "" }]);
  const removeEnvVar = (index: number) => {
    const updated = envVars.filter((_, i) => i !== index);
    setEnvVars(updated);
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setError(null);

    try {
      const result = await deployProject(repo_url ,initial_name, name,envVars);

      if (!result || result.error) {
        setError(result.error || "Deployment failed.");
        return;
      }

      if (result.data?.workspaceSlug && result.data.projectName) {
        router.push(`/new/deploy/${result.data.build_id}`);
      } else {
        setError("Deployment succeeded, but missing redirect info.");
      }
    } catch (err) {
      console.error("Deployment error:", err);
      setError("Unexpected deployment error.");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="max-w-xl w-full px-4 sm:px-6 lg:px-8 mx-auto mt-10 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-center">
        Deploy Your React Project
      </h1>

      {error && <div className="text-sm text-red-500">{error}</div>}

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
      <div className="space-y-2">
        <Label>Environment Variables</Label>
        <div className="space-y-2">
          {envVars.map((env, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder="KEY"
                value={env.key}
                onChange={(e) => handleEnvChange(index, "key", e.target.value)}
                disabled={isDeploying}
              />
              <Input
                placeholder="value"
                value={env.value}
                onChange={(e) =>
                  handleEnvChange(index, "value", e.target.value)
                }
                disabled={isDeploying}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removeEnvVar(index)}
                disabled={isDeploying}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={addEnvVar}
            disabled={isDeploying}
            className="cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Variable
          </Button>
        </div>
      </div>

      <Button
        onClick={handleDeploy}
        disabled={isDeploying}
        className="w-full sm:w-auto cursor-pointer"
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
