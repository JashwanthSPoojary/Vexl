import { LogEntry } from "@/types/types"

interface LogLineProps {
  log: LogEntry
  index: number
  isFresh: boolean
  getLogPrefix: (log: LogEntry) => string
}

export function LogLine({ log, index, isFresh, getLogPrefix }: LogLineProps) {
   const isError = /\berror\b/i.test(log.message);

  return (
     <div
      key={index}
      className={`leading-relaxed hover:bg-green-500/5 transition-opacity duration-700 ${
        isFresh ? "opacity-100" : "opacity-80"
      } ${isError ? "text-red-500" : "text-green-500"}`} 
    >
      <span className="opacity-60">{getLogPrefix(log)}</span>
      <span className="ml-2 break-words">{log.message}</span>
    </div>
  )
}
