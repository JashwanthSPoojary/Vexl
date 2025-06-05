"use client"

import { useState } from "react"
import { ResponsiveSidebar } from "./ResponsiveSidebar"
import { SidebarContent } from "./SidebarContent"
import { SettingsContent } from "./SettingsContent"
import { updateProjectSubdomain } from "@/actions/domain"
import { deleteProject } from "@/actions/projects"
import { settingsSections } from "@/lib/utils/settings-page-utils"
import { subdomainSchema } from "@/lib/schemas/deploy-form"

interface ProjectSettingsProps {
  projectName: string
  workspaceSlug: string
  deployUrl: string
  alternativeDeployUrl: string | null
}

export default function ProjectSettings({
  project_data,
}: {
  project_data: ProjectSettingsProps
}) {
  const [activeSection, setActiveSection] = useState("domain")

  const handleSubdomainUpdate = async (newSubdomain: string) => {
    await updateProjectSubdomain(project_data.deployUrl, newSubdomain)
  }

  const handleDelete = async () => {
    await deleteProject(project_data.projectName, project_data.workspaceSlug)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 py-6">
      <div className="lg:hidden">
        <ResponsiveSidebar activeSection={activeSection} onChange={setActiveSection} />
      </div>

      <div className="hidden lg:block w-80 rounded-lg">
        <SidebarContent
          sections={settingsSections}
          activeSection={activeSection}
          onChange={setActiveSection}
        />
      </div>

      <div className="flex-1 min-w-0">
        <SettingsContent
          sectionId={activeSection}
          projectName={project_data.projectName}
          subdomain={project_data.alternativeDeployUrl ?? ""}
          onSubdomainUpdate={handleSubdomainUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
