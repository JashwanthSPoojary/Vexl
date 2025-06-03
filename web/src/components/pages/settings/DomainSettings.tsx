import { useState } from "react"
import { Globe, Edit3, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props {
  subdomain: string
  onUpdate?: (newSubdomain: string) => Promise<void>
}

export const DomainSettings = ({ subdomain, onUpdate }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [current, setCurrent] = useState(subdomain)
  const [edited, setEdited] = useState(current)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    if (edited.trim() === current) return setIsEditing(false)
    setLoading(true)
  setError(null)
    try {
      await onUpdate?.(edited.trim())
      setCurrent(edited.trim())
      setIsEditing(false)
    } catch (e:any) {
      if (e?.message?.includes("already exists")) {
      setError("This subdomain is already in use.");
    } else {
      setError("Failed to update subdomain.");
    }
      setEdited(current)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Domain</h2>
        <p className="text-muted-foreground">You can rename your project domain</p>
      </div>

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
                  onChange={(e) => setEdited(e.target.value)}
                  className="w-full"
                  placeholder="Enter subdomain"
                  disabled={loading}
                />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              </div>
              <span className="text-muted-foreground">.yourapp.com</span>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Button size="sm" onClick={save} disabled={loading || !edited.trim()}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(false)} disabled={loading}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3 w-full">
              <span className="text-foreground font-mono">{current}</span>
              <span className="text-muted-foreground">.vexl.live</span>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} className="ml-auto">
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}