import { useState } from "react";
import { useRouter } from "next/navigation";
import { deployProject } from "@/actions/deploy";
import { DeployProjectResult } from "@/types/types";

export function useDeployProject({
  repo_url,
  initial_name,
  repo_owner,
  default_branch,
}: {
  repo_url: string;
  initial_name: string;
  repo_owner: string;
  default_branch: string;
}) {
  const [name, setName] = useState(initial_name);
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [envError, setEnvError] = useState<string | null>(null);

  const router = useRouter();

  const deploy = async (envVars: { key: string; value: string }[]) => {
  setIsDeploying(true);
  setError(null);

  try {
    const result: DeployProjectResult = await deployProject(
      name,
      repo_url,
      initial_name,
      repo_owner,
      default_branch,
      envVars
    );

    if (!result.success) {
      setError(result.message || "Deployment failed.");
      return false;
    }

    const { workspaceSlug, projectName, build_id } = result.data;

    if (workspaceSlug && projectName && build_id) {
      router.push(`/new/deploy/${build_id}`);
      return true;
    } else {
      setError("Deployment succeeded, but missing redirect info.");
      return false;
    }
  } catch (err) {
    console.error("Deployment error:", err);
    setError("Unexpected deployment error.");
    return false;
  } finally {
    setIsDeploying(false);
  }
};


  return {
    name,
    setName,
    isDeploying,
    error,
    deploy,
    nameError,
    setNameError,
    envError,
    setEnvError
  };
}
