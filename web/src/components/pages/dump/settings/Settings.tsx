"use client";

import { SettingsLayout } from "@/components/pages/settings/SettingsLayout";
import { useIsMobile } from "@/hooks/use-media-query";
import { SettingsProject } from "@/types/types";

const mockProject: SettingsProject = {
  id: "project-123",
  name: "My Awesome Project",
  domains: [{ id: "domain-1", name: "example.com", isPrimary: true }],
  environments: [
    {
      id: "env-1",
      name: "Production",
      branch: "main",
      url: "https://example.com",
    },
    {
      id: "env-2",
      name: "Preview",
      branch: "develop",
      url: "https://preview.example.com",
    },
  ],
};

export default function Settings({
  data,
}: {
  data: {
    deployUrl: string;
  } | null;
}) {
  const isMobile = useIsMobile();

  const handleProjectUpdate = async (updates: Partial<SettingsProject>) => {
    console.log("Updating project:", updates);
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <div className={`${isMobile ? "p-0" : "container mx-auto p-6"}`}>
      {!isMobile && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Project Settings</h1>
          <p className="text-muted-foreground">
            Manage your project configuration
          </p>
        </div>
      )}

      <SettingsLayout
        project={data}
        onProjectUpdate={handleProjectUpdate}
        className={isMobile ? "h-screen" : "h-[600px]"}
      />
    </div>
  );
}
