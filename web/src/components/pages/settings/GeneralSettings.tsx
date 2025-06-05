import { useProjectDeletion } from "@/hooks/use-project-deletion"
import { DeleteSection } from "./DeleteSection"

interface GeneralSettingsProps {
  projectName: string
  onDelete?: () => Promise<void>
}

export const GeneralSettings = ({ projectName, onDelete }: GeneralSettingsProps) => {
  const {
    confirmName,
    setConfirmName,
    error,
    loading,
    canDelete,
    handleDelete,
  } = useProjectDeletion(projectName, onDelete)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">General</h2>
        <p className="text-muted-foreground">
          You can delete your project permanently here.
        </p>
      </div>

      <DeleteSection
        projectName={projectName}
        confirmName={confirmName}
        onChangeConfirm={setConfirmName}
        onDelete={handleDelete}
        canDelete={canDelete}
        loading={loading}
        error={error}
      />
    </div>
  )
}
