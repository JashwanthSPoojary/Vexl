import { DomainSettings } from "./DomainSettings"
import { GeneralSettings } from "./GeneralSettings"
import { PlaceholderSettings } from "./PlaceholderSettings"
import { settingsSections } from "@/lib/utils/settings-page-utils"

interface SettingsContentProps {
  sectionId: string
  projectName: string
  subdomain: string
  onSubdomainUpdate: (sub: string) => Promise<void>
  onDelete: () => Promise<void>
}

export const SettingsContent = ({
  sectionId,
  projectName,
  subdomain,
  onSubdomainUpdate,
  onDelete,
}: SettingsContentProps) => {
  const section = settingsSections.find((s) => s.id === sectionId)
  if (!section) return null

  switch (sectionId) {
    case "domain":
      return <DomainSettings subdomain={subdomain} onUpdate={onSubdomainUpdate} />
    case "general":
      return <GeneralSettings projectName={projectName} onDelete={onDelete} />
    default:
      return <PlaceholderSettings section={section} />
  }
}
