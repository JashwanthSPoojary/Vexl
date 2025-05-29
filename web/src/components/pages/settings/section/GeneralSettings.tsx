"use client"

import * as React from "react"
import { Edit2, Check, X } from 'lucide-react'
import { useIsMobile, useIsSmallMobile } from "@/hooks/use-media-query"
import { SettingsProject } from "@/types/types"
import { useForm } from "@/hooks/use-form"

interface GeneralSettingsProps {
  project: SettingsProject
  onProjectUpdate: (updates: Partial<SettingsProject>) => Promise<void>
  isLoading: boolean
  error: Error | null
}

interface GeneralFormValues {
  name: string
}

export function GeneralSettings({ project, onProjectUpdate, isLoading }: GeneralSettingsProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const isMobile = useIsMobile()
  const isSmallMobile = useIsSmallMobile()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const initialValues = React.useMemo(() => ({ name: project.name }), [project.name])
  const form = useForm<GeneralFormValues>({
    initialValues,
    validate: (values) => {
      const errors: Partial<Record<keyof GeneralFormValues, string>> = {}
      if (!values.name.trim()) {
        errors.name = "Project name is required"
      }
      return errors
    },
    onSubmit: async (values) => {
      await onProjectUpdate({ name: values.name.trim() })
      setIsEditing(false)
    },
  })

  // Focus input when editing starts
  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  // Reset form when project name changes
  React.useEffect(() => {
    form.setFieldValue("name", project.name)
  }, [project.name])

  const handleEdit = () => {
    setIsEditing(true)
    form.setFieldValue("name", project.name)
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.setFieldValue("name", project.name)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      form.handleSubmit();
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div className={`space-y-6 ${isMobile ? "p-4" : "p-6"} ${isSmallMobile ? "p-3" : ""}`}>
      <div className="space-y-1">
        <h2 className={`font-medium ${isMobile ? "text-lg" : "text-xl"}`}>General</h2>
        <p className="text-sm text-muted-foreground">Manage your project's basic information</p>
      </div>

      <div className="space-y-4 w-full max-w-md">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground block">Project Name</label>
          
          {isEditing ? (
            <div className="space-y-3">
              <input
                ref={inputRef}
                type="text"
                value={form.values.name}
                onChange={(e) => form.setFieldValue("name", e.target.value)}
                onKeyDown={handleKeyDown}
                className={`w-full bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md border border-border ${
                  isMobile ? "px-3 py-3 text-base" : "px-3 py-2"
                }`}
                placeholder="Enter project name"
                aria-invalid={!!form.errors.name}
                aria-describedby={form.errors.name ? "name-error" : undefined}
                disabled={isLoading}
              />
              
              {form.errors.name && form.touched.name && (
                <p id="name-error" className="text-xs text-destructive">
                  {form.errors.name}
                </p>
              )}

              <div className={`flex gap-2 ${isMobile ? "flex-col" : ""}`}>
                <button
                  onClick={form.handleSubmit}
                  disabled={isLoading || !form.isValid || !form.isDirty}
                  className={`bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
                    isMobile ? "w-full justify-center py-3 text-base" : "px-4 py-2 text-sm"
                  }`}
                >
                  <Check className="h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
                
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className={`text-muted-foreground hover:text-foreground border border-border rounded-md transition-colors disabled:opacity-50 flex items-center gap-2 ${
                    isMobile ? "w-full justify-center py-3 text-base" : "px-4 py-2 text-sm"
                  }`}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className={`flex items-center justify-between border border-border/50 rounded-md ${
              isMobile ? "p-3" : "p-2"
            }`}>
              <span className={`${isMobile ? "text-base" : "text-sm"} font-medium truncate flex-1 mr-2`}>
                {project.name}
              </span>
              <button
                onClick={handleEdit}
                className={`text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-md hover:bg-accent/50 transition-colors ${
                  isMobile ? "px-3 py-2" : "px-2 py-1"
                }`}
                aria-label="Rename project"
              >
                <Edit2 className="h-4 w-4" />
                {isMobile && <span className="text-sm">Rename</span>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
