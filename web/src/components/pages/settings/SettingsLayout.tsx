"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import { useIsMobile } from "@/hooks/use-media-query"
import { SettingsProject, SettingsSection } from "@/types/types"
import { SettingsSidebar } from "./SettingsSidebar"
import { SettingsContent } from "./SettingsContent"

interface SettingsLayoutProps {
  project?: SettingsProject
  onProjectUpdate?: (project: Partial<SettingsProject>) => Promise<void>
  defaultSection?: SettingsSection
  className?: string
}

// Default project data
const defaultProject: SettingsProject = {
  id: "default",
  name: "My Project",
  domains: [
    { id: "1", name: "example.com", isPrimary: true },
    { id: "2", name: "www.example.com", isPrimary: false },
  ],
  environments: [
    { id: "1", name: "Production", branch: "main", url: "https://example.com" },
    { id: "2", name: "Preview", branch: "develop", url: "https://preview.example.com" },
  ],
}

export function SettingsLayout({
  project = defaultProject,
  onProjectUpdate = async () => {},
  defaultSection = "general",
  className,
}: SettingsLayoutProps) {
  const [activeSection, setActiveSection] = React.useState<SettingsSection>(defaultSection)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const isMobile = useIsMobile()

  // Ensure project has all required properties
  const safeProject = React.useMemo(
    () => ({
      id: project?.id || defaultProject.id,
      name: project?.name || defaultProject.name,
      domains: project?.domains || defaultProject.domains,
      environments: project?.environments || defaultProject.environments,
    }),
    [project],
  )

  // Close sidebar when section changes on mobile
  const handleSectionChange = (section: SettingsSection) => {
    setActiveSection(section)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  // Handle project updates with loading and error states
  const handleProjectUpdate = React.useCallback(
    async (updates: Partial<SettingsProject>) => {
      setIsLoading(true)
      setError(null)

      try {
        await onProjectUpdate(updates)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to update project"))
        console.error("Failed to update project:", err)
      } finally {
        setIsLoading(false)
      }
    },
    [onProjectUpdate],
  )

  return (
    <div className={cn("flex h-full bg-transparent relative", className)}>
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-transparent transition-transform duration-200 ease-in-out z-50",
          isMobile
            ? cn(
                "fixed left-0 top-0 h-full w-64 bg-background border-r shadow-lg",
                sidebarOpen ? "translate-x-0" : "-translate-x-full",
              )
            : "relative w-56 flex-shrink-0",
        )}
      >
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <SettingsContent
          activeSection={activeSection}
          project={safeProject}
          onProjectUpdate={handleProjectUpdate}
          isLoading={isLoading}
          error={error}
          onMenuClick={() => setSidebarOpen(true)}
          isMobile={isMobile}
        />
      </div>
    </div>
  )
}
