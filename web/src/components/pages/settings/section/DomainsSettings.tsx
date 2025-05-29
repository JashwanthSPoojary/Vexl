"use client"

import * as React from "react"
import { Edit2, Check, X } from 'lucide-react'
import { useIsMobile, useIsSmallMobile } from "@/hooks/use-media-query"
import { Domain, SettingsProject } from "@/types/types"

interface DomainsSettingsProps {
  project: SettingsProject
  onProjectUpdate: (updates: Partial<SettingsProject>) => Promise<void>
  isLoading: boolean
  error: Error | null
}

export function DomainsSettings({ project, onProjectUpdate, isLoading }: DomainsSettingsProps) {
  const [editingDomain, setEditingDomain] = React.useState<string | null>(null)
  const [editValue, setEditValue] = React.useState("")
  const editInputRef = React.useRef<HTMLInputElement>(null)
  const isMobile = useIsMobile()
  const isSmallMobile = useIsSmallMobile()

  const handleEdit = (domain: Domain) => {
    setEditingDomain(domain.id)
    setEditValue(domain.name)
  }

  React.useEffect(() => {
    if (editingDomain && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingDomain])

  const handleSave = async (domainId: string) => {
    if (!editValue.trim()) return

    try {
      const updatedDomains = project.domains.map((domain) =>
        domain.id === domainId ? { ...domain, name: editValue.trim() } : domain,
      )
      await onProjectUpdate({ domains: updatedDomains })
      setEditingDomain(null)
    } catch (error) {
      console.error("Failed to update domain:", error)
    }
  }

  const handleCancel = () => {
    setEditingDomain(null)
    setEditValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent, domainId: string) => {
    if (e.key === "Enter") {
      handleSave(domainId)
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div className={`space-y-6 ${isMobile ? "p-4" : "p-6"} ${isSmallMobile ? "p-3" : ""}`}>
      <div className="space-y-1">
        <h2 className={`font-medium ${isMobile ? "text-lg" : "text-xl"}`}>Domains</h2>
        <p className="text-sm text-muted-foreground">Manage and rename your project domains</p>
      </div>

      <div className="space-y-3">
        {project.domains.length === 0 ? (
          <p className="text-sm text-muted-foreground">No domains configured</p>
        ) : (
          project.domains.map((domain) => (
            <div
              key={domain.id}
              className={`flex items-center justify-between border-b border-border/50 ${
                isMobile ? "py-4 flex-col items-start gap-3" : "py-3"
              }`}
            >
              <div className={`flex items-center gap-3 ${isMobile ? "w-full" : "flex-1"}`}>
                {editingDomain === domain.id ? (
                  <div className={`flex items-center gap-2 ${isMobile ? "w-full flex-wrap" : ""}`}>
                    <input
                      ref={editInputRef}
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, domain.id)}
                      className={`bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 rounded border border-border ${
                        isMobile ? "flex-1 px-3 py-3 text-base min-w-0" : "px-3 py-1"
                      }`}
                      disabled={isLoading}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(domain.id)}
                        disabled={isLoading || !editValue.trim()}
                        className={`rounded-full hover:bg-accent/50 disabled:opacity-50 ${isMobile ? "p-3" : "p-1"}`}
                        aria-label="Save"
                      >
                        <Check className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isLoading}
                        className={`rounded-full hover:bg-accent/50 disabled:opacity-50 ${isMobile ? "p-3" : "p-1"}`}
                        aria-label="Cancel"
                      >
                        <X className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`${isMobile ? "flex-1 min-w-0" : ""}`}>
                      <span className={`${isMobile ? "text-base" : "text-sm"} break-all`}>{domain.name}</span>
                    </div>
                    {domain.isPrimary && (
                      <span className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs flex-shrink-0">
                        Primary
                      </span>
                    )}
                  </>
                )}
              </div>
              {editingDomain !== domain.id && (
                <button
                  onClick={() => handleEdit(domain)}
                  className={`rounded-full hover:bg-accent/50 flex-shrink-0 ${isMobile ? "p-3 self-end" : "p-1"}`}
                  aria-label={`Edit ${domain.name}`}
                >
                  <Edit2 className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
