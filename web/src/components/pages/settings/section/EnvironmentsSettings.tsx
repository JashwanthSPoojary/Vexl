"use client"

import * as React from "react"
import { Plus, X, Trash2 } from 'lucide-react'
import { useForm } from "@/hooks/use-form"
import { useIsMobile, useIsSmallMobile } from "@/hooks/use-media-query"
import { SettingsProject } from "@/types/types"

interface EnvironmentsSettingsProps {
  project: SettingsProject
  onProjectUpdate: (updates: Partial<SettingsProject>) => Promise<void>
  isLoading: boolean
  error: Error | null
}

interface EnvironmentFormValues {
  name: string
  branch: string
}

export function EnvironmentsSettings({ project, onProjectUpdate, isLoading }: EnvironmentsSettingsProps) {
  const [showAddForm, setShowAddForm] = React.useState(false)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)
  const isMobile = useIsMobile()
  const isSmallMobile = useIsSmallMobile()

  const initialValues = React.useMemo(
  () => ({ name: "", branch: "" }),
  []
)

  const form = useForm<EnvironmentFormValues>({
    initialValues,
    validate: (values) => {
      const errors: Partial<Record<keyof EnvironmentFormValues, string>> = {}
      if (!values.name.trim()) {
        errors.name = "Environment name is required"
      }
      if (!values.branch.trim()) {
        errors.branch = "Branch name is required"
      }
      return errors
    },
    onSubmit: async (values) => {
      const newEnvironment = {
        id: Date.now().toString(),
        name: values.name.trim(),
        branch: values.branch.trim(),
      }

      await onProjectUpdate({ environments: [...project.environments, newEnvironment] })
      setShowAddForm(false)
    },
  })

  const handleDelete = async (envId: string) => {
    try {
      setDeletingId(envId)
      const updatedEnvironments = project.environments.filter((env) => env.id !== envId)
      await onProjectUpdate({ environments: updatedEnvironments })
    } catch (error) {
      console.error("Failed to delete environment:", error)
    } finally {
      setDeletingId(null)
    }
  }
  React.useEffect(() => {
  if (showAddForm) {
    form.resetForm()
  }
}, [showAddForm])

  return (
    <div className={`space-y-6 ${isMobile ? "p-4" : "p-6"} ${isSmallMobile ? "p-3" : ""}`}>
      <div className={`flex justify-between gap-4 ${isMobile ? "flex-col" : "items-center"}`}>
        <div className="space-y-1">
          <h2 className={`font-medium ${isMobile ? "text-lg" : "text-xl"}`}>Environments</h2>
          <p className="text-sm text-muted-foreground">Manage your deployment environments</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className={`bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 flex items-center gap-2 ${
            isMobile ? "w-full justify-center py-3" : "px-4 py-2"
          }`}
          aria-label="Add environment"
        >
          <Plus className="h-4 w-4" />
          Add Environment
        </button>
      </div>

      {showAddForm && (
        <div className={`bg-accent/30 rounded space-y-4 ${isMobile ? "p-4" : "p-4"}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Add New Environment</h3>
            <button
              onClick={() => {
                setShowAddForm(false)
                form.resetForm()
              }}
              className={`rounded-full hover:bg-accent/50 ${isMobile ? "p-2" : "p-1"}`}
              aria-label="Close form"
            >
              <X className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
            </button>
          </div>

          <form onSubmit={form.handleSubmit} className="space-y-4">
            <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
              <div className="space-y-2">
                <label htmlFor="env-name" className="text-sm text-muted-foreground block">
                  Name
                </label>
                <input
                  id="env-name"
                  type="text"
                  value={form.values.name}
                  onChange={(e) => form.setFieldValue("name", e.target.value)}
                  className={`w-full bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 rounded border border-border ${
                    isMobile ? "px-3 py-3 text-base" : "px-3 py-2"
                  }`}
                  placeholder="e.g., staging"
                  aria-invalid={!!form.errors.name}
                  aria-describedby={form.errors.name ? "name-error" : undefined}
                />
                {form.errors.name && form.touched.name && (
                  <p id="name-error" className="text-xs text-destructive mt-1">
                    {form.errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="env-branch" className="text-sm text-muted-foreground block">
                  Branch
                </label>
                <input
                  id="env-branch"
                  type="text"
                  value={form.values.branch}
                  onChange={(e) => form.setFieldValue("branch", e.target.value)}
                  className={`w-full bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 rounded border border-border ${
                    isMobile ? "px-3 py-3 text-base" : "px-3 py-2"
                  }`}
                  placeholder="e.g., develop"
                  aria-invalid={!!form.errors.branch}
                  aria-describedby={form.errors.branch ? "branch-error" : undefined}
                />
                {form.errors.branch && form.touched.branch && (
                  <p id="branch-error" className="text-xs text-destructive mt-1">
                    {form.errors.branch}
                  </p>
                )}
              </div>
            </div>
            <div className={`flex gap-2 ${isMobile ? "flex-col" : ""}`}>
              <button
                type="submit"
                disabled={isLoading || !form.isValid}
                className={`bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isMobile ? "w-full py-3 text-base" : "px-4 py-2 text-sm"
                }`}
              >
                {isLoading ? "Adding..." : "Add Environment"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  form.resetForm()
                }}
                className={`text-muted-foreground hover:text-foreground border border-border rounded ${
                  isMobile ? "w-full py-3 text-base" : "px-4 py-2 text-sm"
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {project.environments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No environments configured</p>
        ) : (
          project.environments.map((env) => (
            <div
              key={env.id}
              className={`border-b border-border/50 ${
                isMobile ? "py-4 flex flex-col gap-3" : "py-3 flex items-center justify-between"
              }`}
            >
              <div className={`${isMobile ? "w-full" : "space-y-1"}`}>
                <div className={`flex items-center gap-2 ${isMobile ? "flex-wrap" : ""}`}>
                  <span className={`${isMobile ? "text-base" : "text-sm"} font-medium`}>{env.name}</span>
                  <span className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs flex-shrink-0">
                    {env.branch}
                  </span>
                </div>
                {env.url && (
                  <p className={`text-muted-foreground break-all ${isMobile ? "text-sm mt-1" : "text-xs"}`}>
                    {env.url}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(env.id)}
                disabled={isLoading || deletingId === env.id}
                className={`text-muted-foreground hover:text-destructive disabled:opacity-50 flex items-center gap-2 ${
                  isMobile ? "self-end px-3 py-2 border border-destructive/20 rounded" : "px-3 py-1 text-sm"
                }`}
                aria-label={`Delete ${env.name} environment`}
              >
                <Trash2 className="h-4 w-4" />
                {isMobile && (deletingId === env.id ? "Deleting..." : "Delete")}
                {!isMobile && (deletingId === env.id ? "Deleting..." : "Delete")}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
