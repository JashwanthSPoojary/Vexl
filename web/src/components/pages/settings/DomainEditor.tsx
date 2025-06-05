import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, X, Edit3, Globe } from "lucide-react"

interface DomainEditorProps {
  current: string
  edited: string
  isEditing: boolean
  error?: string | null
  loading: boolean
  canSave: boolean
  onChange: (val: string) => void
  onSave: () => void
  onCancel: () => void
  onEdit: () => void
}

export const DomainEditor = ({
  current,
  edited,
  isEditing,
  error,
  loading,
  canSave,
  onChange,
  onSave,
  onCancel,
  onEdit,
}: DomainEditorProps) => {
  return (
    <div className="p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-foreground font-medium">Subdomain</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {isEditing ? (
          <div className="flex flex-wrap items-center gap-2 w-full">
            <div className="flex-1 min-w-[180px]">
              <Input
                value={edited}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter subdomain"
                disabled={loading}
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
            <span className="text-muted-foreground">.vexl.live</span>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button className="cursor-pointer" size="sm" onClick={onSave} disabled={!canSave}>
                <Check className="h-4 w-4" />
              </Button>
              <Button className="cursor-pointer" size="sm" variant="outline" onClick={onCancel} disabled={loading}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3 w-full">
            <span className="text-foreground font-mono">{current}</span>
            <span className="text-muted-foreground">.vexl.live</span>
            <Button size="sm" variant="ghost" onClick={onEdit} className="ml-auto cursor-pointer">
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
