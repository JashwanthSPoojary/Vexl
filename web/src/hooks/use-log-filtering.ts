import { useEffect, useState } from "react"
import { LogEntry } from "@/types/types"

export function useLogFiltering(logs: LogEntry[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLogs(logs)
    } else {
      const q = searchQuery.toLowerCase()
      setFilteredLogs(
        logs.filter((log) =>
          log.message.toLowerCase().includes(q) ||
          log.level.toLowerCase().includes(q)
        )
      )
    }
  }, [logs, searchQuery])

  return { searchQuery, setSearchQuery, filteredLogs }
}
