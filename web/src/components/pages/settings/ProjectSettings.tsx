"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Globe, Settings, Users, Shield, CreditCard } from "lucide-react"
import { SettingsSection } from "@/types/types"
import { DomainSettings } from "./DomainSettings"
import { PlaceholderSettings } from "./PlaceholderSettings"
import { SidebarContent } from "./SidebarContent"

const settingsSections: SettingsSection[] = [
  {
    id: "domain",
    label: "Domain",
    icon: Globe,
    description: "Manage your project domain and subdomain settings",
  },
  {
    id: "general",
    label: "General",
    icon: Settings,
    description: "Basic project configuration and preferences",
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
    description: "Manage team members and permissions",
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    description: "Security settings and access controls",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    description: "Subscription and billing information",
  },
]
interface ProjectSettingsProps {
  subdomain: string
  onSubdomainUpdate?: (newSubdomain: string) => Promise<void>
}
export default function ProjectSettings({ subdomain, onSubdomainUpdate }: ProjectSettingsProps) {
  const [activeSection, setActiveSection] = useState("domain")
    const [isEditingDomain, setIsEditingDomain] = useState(false)
 const [currentSubdomain, setSubdomain] = useState(subdomain)
  const [editedSubdomain, setEditedSubdomain] = useState(currentSubdomain)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDomainEdit = () => {
    setIsEditingDomain(true)
    setEditedSubdomain(currentSubdomain)
  }

  const handleDomainSave = async () => {
    if (editedSubdomain.trim() === currentSubdomain) {
      setIsEditingDomain(false)
      return
    }

    setIsUpdating(true)
    try {
      await onSubdomainUpdate?.(editedSubdomain.trim())
      // Update the subdomain state with the new value
      setSubdomain(editedSubdomain.trim())
      setIsEditingDomain(false)
    } catch (error) {
      console.error("Failed to update subdomain:", error)
      setEditedSubdomain(currentSubdomain)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDomainCancel = () => {
    setEditedSubdomain(currentSubdomain)
    setIsEditingDomain(false)
  }

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  const renderContent = () => {
    const section = settingsSections.find((s) => s.id === activeSection)
    if (!section) return null

    return activeSection === "domain" ? (
      <DomainSettings subdomain={subdomain} onUpdate={onSubdomainUpdate} />
    ) : (
      <PlaceholderSettings section={section} />
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 py-6">
      <div className="lg:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="mb-4">
              <Menu className="h-4 w-4 mr-2" />
              Settings Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SidebarContent
              sections={settingsSections}
              activeSection={activeSection}
              onChange={(id) => {
                setActiveSection(id)
                setIsMobileMenuOpen(false)
              }}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block w-80 rounded-lg">
        <SidebarContent
          sections={settingsSections}
          activeSection={activeSection}
          onChange={setActiveSection}
        />
      </div>

      <div className="flex-1 min-w-0">{renderContent()}</div>
    </div>
  )
}
