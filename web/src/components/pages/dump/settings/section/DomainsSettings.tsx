"use client"

import * as React from "react"
import { Edit2, Check, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-media-query"
import { SettingsProject } from "@/types/types"
import { isDomainUnique } from "@/actions/domain"

const DOMAIN_REGEX = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;

interface DomainsSettingsProps {
  project: {
    deploy_url: string | undefined;
}
  onProjectUpdate: (updates: Partial<SettingsProject>) => Promise<void>
  isLoading: boolean
}

export function DomainsSettings({ project, onProjectUpdate, isLoading }: DomainsSettingsProps) {
  const isMobile = useIsMobile()
  const domain = project.deploy_url // Only one domain allowed

  const [isEditing, setIsEditing] = React.useState(false)
  const [editValue, setEditValue] = React.useState<string | undefined>(domain ?? "")
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = async () => {
    const trimmed = editValue?.trim()
    if (!DOMAIN_REGEX.test(trimmed|| "")) {
      setError("Invalid domain format.")
      return
    }

    if (trimmed === domain) {
      setIsEditing(false)
      return
    }

    const isUnique = await isDomainUnique(trimmed|| "")
    if (!isUnique) {
      setError("Domain already exists.")
      return
    }

    await onProjectUpdate({
      domain:{
        old_domain:domain as string,
        new_name:trimmed as string
      }
    })

    setIsEditing(false)
    setError(null)
  }

  return (
    <div className={`space-y-6 ${isMobile ? "p-4" : "p-6"}`}>
      <div className="space-y-1">
        <h2 className={`font-medium ${isMobile ? "text-lg" : "text-xl"}`}>Domain</h2>
        <p className="text-sm text-muted-foreground">You can rename your project domain</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-border/50 py-3">
          {isEditing ? (
            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={editValue}
                  onChange={(e) => {
                    setEditValue(e.target.value)
                    setError(null)
                  }}
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 border border-border rounded text-sm"
                />
                <button onClick={handleSave} disabled={isLoading} className="p-2 rounded hover:bg-accent/50">
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setEditValue(domain)
                    setError(null)
                  }}
                  className="p-2 rounded hover:bg-accent/50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          ) : (
            <>
              <div className="flex-1 text-sm">{domain}</div>
              <button onClick={() => setIsEditing(true)} className="p-2 rounded hover:bg-accent/50">
                <Edit2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
