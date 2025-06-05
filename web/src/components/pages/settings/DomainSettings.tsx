import { useDomainEditor } from "@/hooks/use-domain-editor"
import { DomainEditor } from "./DomainEditor"

interface Props {
  subdomain: string
  onUpdate?: (newSubdomain: string) => Promise<void>
}

export const DomainSettings = ({ subdomain, onUpdate }: Props) => {
  const {
    isEditing,
    current,
    edited,
    error,
    loading,
    canSave,
    setEdited,
    save,
    cancelEdit,
    startEdit,
  } = useDomainEditor(subdomain, onUpdate)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Domain</h2>
        <p className="text-muted-foreground">You can rename your project domain</p>
      </div>

      <DomainEditor
        current={current}
        edited={edited}
        isEditing={isEditing}
        error={error}
        loading={loading}
        canSave={canSave}
        onChange={setEdited}
        onSave={save}
        onCancel={cancelEdit}
        onEdit={startEdit}
      />
    </div>
  )
}
