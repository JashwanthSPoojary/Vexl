"use client"

import { cn } from "@/lib/utils"
import { SettingsSection } from "@/types/types"

interface Props {
  sections: SettingsSection[]
  activeSection: string
  onChange: (id: string) => void
}

export const SidebarContent = ({ sections, activeSection, onChange }: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <nav className="space-y-0.5">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => onChange(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                  activeSection === section.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{section.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}