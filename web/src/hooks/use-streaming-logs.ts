import { useEffect, useState } from "react"
import { LogEntry } from "@/types/types"

export function useStreamingLogs(logs: LogEntry[], streamingSpeedMs = 50) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [freshIndices, setFreshIndices] = useState<Set<number>>(new Set())

  useEffect(() => {
    setVisibleCount(0)
    setFreshIndices(new Set())
  }, [logs])

  useEffect(() => {
    if (visibleCount >= logs.length) return

    const interval = setInterval(() => {
      setVisibleCount((count) => {
        if (count >= logs.length) {
          clearInterval(interval)
          return count
        }
        setFreshIndices((prev) => new Set(prev).add(count))
        setTimeout(() => {
          setFreshIndices((prev) => {
            const newSet = new Set(prev)
            newSet.delete(count)
            return newSet
          })
        }, 1500)
        return count + 1
      })
    }, streamingSpeedMs)

    return () => clearInterval(interval)
  }, [visibleCount, logs.length, streamingSpeedMs])

  const logsToShow = logs.slice(0, visibleCount)

  return { logsToShow, freshIndices }
}
