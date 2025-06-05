import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DeleteSectionProps {
  projectName: string
  confirmName: string
  onChangeConfirm: (val: string) => void
  onDelete: () => void
  canDelete: boolean
  loading: boolean
  error?: string | null
}

export const DeleteSection = ({
  projectName,
  confirmName,
  onChangeConfirm,
  onDelete,
  canDelete,
  loading,
  error,
}: DeleteSectionProps) => (
  <div className="p-6 rounded-lg border border-destructive/30 bg-destructive/10">
    <div className="flex items-center gap-2 mb-4">
      <Trash2 className="h-5 w-5 text-destructive" />
      <h3 className="text-destructive font-medium">Delete Project</h3>
    </div>

    <p className="text-sm text-muted-foreground mb-4">
      This will permanently delete{" "}
      <span className="font-semibold text-foreground">{projectName}</span>. This action cannot be undone.
    </p>

    <div className="space-y-2">
      <Input
        value={confirmName}
        onChange={(e) => onChangeConfirm(e.target.value)}
        placeholder={`Type "${projectName}" to confirm`}
        disabled={loading}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button
        variant="destructive"
        disabled={!canDelete}
        onClick={onDelete}
        className="cursor-pointer"
      >
        {loading ? "Deleting..." : "Delete Project"}
      </Button>
    </div>
  </div>
)
