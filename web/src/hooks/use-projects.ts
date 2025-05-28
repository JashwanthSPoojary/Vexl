import { useEffect, useState } from "react"
import { Project } from "@/types/types" 
import { getDeploymentsByWorkspace } from "@/actions/projects"

export function useProjects(workspace:string) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getDeploymentsByWorkspace(workspace);
        if(!data){
            setError("Failed to load projects")
            return
        }
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}
