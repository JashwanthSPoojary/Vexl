"use client";
import { updateProjectSubdomain } from "@/actions/domain";
import ProjectSettings from "./ProjectSettings";

export default function Settings({
  project_data,
}: {
  project_data: {
    deployUrl: string;
    alternativeDeployUrl: string | null;
  };
}) {
  if (!project_data.alternativeDeployUrl) {
    return <div>no data available</div>;
  }

  return (
    <ProjectSettings
      subdomain={project_data.alternativeDeployUrl}
      onSubdomainUpdate={async (newSubdomain: string) => {
        await updateProjectSubdomain(project_data.deployUrl, newSubdomain);
      }}
    />
  );
}
