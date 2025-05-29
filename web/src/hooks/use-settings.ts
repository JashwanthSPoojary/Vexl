"use client"

import { SettingsProject } from "@/types/types"
import * as React from "react"

export function useSettings(initialProject: SettingsProject) {
  const [project, setProject] = React.useState<SettingsProject>(initialProject)

  const updateProject = React.useCallback((updates: Partial<SettingsProject>) => {
    setProject((prev) => ({ ...prev, ...updates }))
  }, [])

  return {
    project,
    updateProject,
  }
}
