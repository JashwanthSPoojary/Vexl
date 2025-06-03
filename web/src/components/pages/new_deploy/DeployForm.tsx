"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Loader } from "lucide-react";
import EnvVarRow from "./EnvVarRow";
import FormSection from "./FormSection";
import { useEnvVars } from "@/hooks/use-env-vars";
import { useDeployProject } from "@/hooks/use-deploy-project";

interface DeployFormProps {
  repo_url: string;
  initial_name: string;
  repo_owner: string;
  default_branch: string;
}
export default function DeployForm({
  repo_url,
  initial_name,
  repo_owner,
  default_branch,
}: DeployFormProps) {
  const { envVars, handleEnvChange, addEnvVar, removeEnvVar } = useEnvVars();
  const { name, setName, isDeploying, error, deploy } = useDeployProject({
    repo_url,
    initial_name,
    repo_owner,
    default_branch,
  });
  const handleDeployClick = () => {
    deploy(envVars);
  };
  return (
    <div className="max-w-5xl mx-auto space-y-6 pt-4 ">
      {error && <div className="text-sm text-red-500">{error}</div>}

      <FormSection title="Repository URL">
        <Input
          value={repo_url}
          disabled
          className="w-full sm:w-[28rem] max-w-full h-11 !bg-background"
        />
      </FormSection>

      <FormSection title="Project Name">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isDeploying}
          className="w-full sm:w-[28rem] max-w-full h-11 !bg-background"
        />
      </FormSection>

      <FormSection title="Environment Variables">
        <div className="space-y-2">
          {envVars.map((env, index) => (
            <EnvVarRow
              key={index}
              index={index}
              env={env}
              onChange={handleEnvChange}
              onRemove={removeEnvVar}
              disabled={isDeploying}
            />
          ))}
          <Button
            type="button"
            onClick={addEnvVar}
            disabled={isDeploying}
            className="cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Variable
          </Button>
        </div>
      </FormSection>

      <Button
        onClick={handleDeployClick}
        disabled={isDeploying}
        className="w-full  sm:w-[28rem] cursor-pointer text-xl font-semibold h-11"
      >
        {isDeploying ? (
          <div className="flex items-center justify-center gap-2 text-xl font-semibold">
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
