import { Link2, Search, X,  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DeployURL } from "@/types/types"
import Link from "next/link"

interface LogsHeaderProps {
  isConnected: boolean
  searchQuery: string
  setSearchQuery: (query: string) => void
  logCount: number
  deployUrl:DeployURL
}

export function LogsHeader({
  isConnected,
  searchQuery,
  setSearchQuery,
  logCount,
  deployUrl,
}: LogsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b">
      {/* Left: Status + Info */}
      <div className="space-y-1">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
          <span>{isConnected ? "Connected" : "Disconnected"}</span>
          <span className="hidden sm:inline">•</span>
          <span>{logCount} logs</span>
        </div>

        {deployUrl.show && (
          <Link
            href={deployUrl.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {/* change this */}
            <Link2 className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 truncate max-w-[200px] sm:max-w-[300px]">{deployUrl.url}</span>
          </Link>
        )}
      </div>

      {/* Right: Search */}
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search logs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-8 h-9"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
