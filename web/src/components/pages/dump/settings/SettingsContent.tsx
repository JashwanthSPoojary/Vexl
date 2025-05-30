"use client"

import { Menu } from 'lucide-react'
import { SettingsProject, SettingsSection } from '@/types/types'
// import { GeneralSettings } from './section/GeneralSettings'
import { DomainsSettings } from './section/DomainsSettings'
// import { EnvironmentsSettings } from './section/EnvironmentsSettings'


interface SettingsContentProps {
  activeSection: SettingsSection
  project: {
    deploy_url: string | undefined;
}
  onProjectUpdate: (updates: Partial<SettingsProject>) => Promise<void>
  isLoading: boolean
  error: Error | null
  onMenuClick?: () => void
  isMobile?: boolean
}

const sectionTitles: Record<SettingsSection, string> = {
  general: "General",
  domain: "Domain",
  environments: "Environments",
}

export function SettingsContent({
  activeSection,
  project,
  onProjectUpdate,
  isLoading,
  error,
  onMenuClick,
  isMobile,
}: SettingsContentProps) {
  const commonProps = {
    project,
    onProjectUpdate,
    isLoading,
    error,
  }

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Mobile header */}
      {isMobile && (
        <div className="flex items-center gap-3 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md hover:bg-accent/50 active:bg-accent/70"
            aria-label="Open navigation menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <h1 className="text-lg font-medium">{sectionTitles[activeSection]}</h1>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="mx-4 mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-sm text-destructive">{error.message}</p>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* {activeSection === "general" && <GeneralSettings {...commonProps} />} */}
        {activeSection === "domain" && <DomainsSettings {...commonProps} />}
        {/* change this */}
        {/* {activeSection === "environments" && <EnvironmentsSettings {...commonProps} />} */}
      </div>
    </div>
  )
}
