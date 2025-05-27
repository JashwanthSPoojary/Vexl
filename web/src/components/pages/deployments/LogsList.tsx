import { LogEntry } from "@/types/types"
import { LogLine } from "./LogLine"
import { LogsEmptyState } from "./LogsEmptyState"
import { useStreamingLogs } from "@/hooks/use-streaming-logs"

interface LogsListProps {
  logs: LogEntry[]
  originalLogs: LogEntry[]
  onScroll: () => void
  getLogPrefix: (log: LogEntry) => string
  scrollRef: React.RefObject<HTMLDivElement | null>
  streamingSpeedMs?: number
}

export function LogsList({
  logs,
  originalLogs,
  onScroll,
  getLogPrefix,
  scrollRef,
  streamingSpeedMs = 50,
}: LogsListProps) {
  const { logsToShow, freshIndices } = useStreamingLogs(logs, streamingSpeedMs)

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="overflow-y-auto bg-black font-mono text-sm sm:text-sm rounded-b-lg"
      style={{
        background: "rgb(0, 0, 0)",
        color: "#00ff00",
        height: "min(60vh, 500px)",
      }}
    >
      {logs.length === 0 ? (
        <LogsEmptyState originalLogsEmpty={originalLogs.length === 0} />
      ) : (
        <div className="p-4 space-y-0">
          {logsToShow.map((log, i) => (
            <LogLine
              key={i}
              log={log}
              index={i}
              isFresh={freshIndices.has(i)}
              getLogPrefix={getLogPrefix}
            />
          ))}
        </div>
      )}
    </div>
  )
}
