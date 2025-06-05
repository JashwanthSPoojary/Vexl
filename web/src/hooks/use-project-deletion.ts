import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useProjectDeletion(projectName: string, onDelete?: () => Promise<void>) {
  const [confirmName, setConfirmName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (confirmName !== projectName) {
      setError("Project name does not match.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      await onDelete?.()
      setIsDeleted(true)
    } catch {
      setError("Failed to delete project.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isDeleted) {
      router.push("/")
    }
  }, [isDeleted, router])

  return {
    confirmName,
    setConfirmName,
    error,
    loading,
    canDelete: confirmName === projectName && !loading,
    handleDelete,
  }
}
