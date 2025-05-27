import { LogEntry } from "@/types/types"

export function formatTimestamp(ts: string) {
  return new Date(ts).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

export function getLogPrefix(log: LogEntry) {
  return `${formatTimestamp(log.timestamp)} ${log.level.toUpperCase().padEnd(4)}`
}

