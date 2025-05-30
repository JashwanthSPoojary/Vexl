"use client"

import type * as React from "react"
import { Settings, Globe, Layers, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { SettingsSection } from "@/types/types"

interface SettingsSidebarProps {
  activeSection: SettingsSection
  onSectionChange: (section: SettingsSection) => void
  onClose?: () => void
  isMobile?: boolean
}

interface SettingsNavItem {
  id: SettingsSection
  title: string
  icon: React.ElementType
}

const settingsItems: SettingsNavItem[] = [
  // { id: "general", title: "General", icon: Settings },
  { id: "domain", title: "Domain", icon: Globe }
  // { id: "environments", title: "Environments", icon: Layers },
]

export function SettingsSidebar({ activeSection, onSectionChange, onClose, isMobile }: SettingsSidebarProps) {
  return (
    <nav className="h-full flex flex-col bg-transparent" aria-label="Settings navigation">
      {/* Mobile header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Settings</h2>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-accent/50" aria-label="Close navigation">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Navigation items */}
      <div className="flex-1 p-2 space-y-1">
        {settingsItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            onClick={() => onSectionChange(item.id)}
          />
        ))}
      </div>
    </nav>
  )
}

interface SidebarItemProps {
  item: SettingsNavItem
  isActive: boolean
  onClick: () => void
}

function SidebarItem({ item, isActive, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-3 text-sm rounded-md transition-colors",
        "hover:bg-accent/50 active:bg-accent/70",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <item.icon className="h-4 w-4 flex-shrink-0" />
      <span className="text-left">{item.title}</span>
    </button>
  )
}
