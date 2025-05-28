"use client"

import { LogEntry } from "@/types/types"
import { useEffect, useRef, useState } from "react"


export function useLogStream(buildId: string) {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const eventSourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    const eventSource = new EventSource(`${process.env.ORCHESTRATOR_URL}/api/builds/${buildId}/logs`)
    eventSourceRef.current = eventSource

    eventSource.onopen = () => setIsConnected(true)

    eventSource.onmessage = (event) => {
      try {
        const logEntry: LogEntry = JSON.parse(event.data)
        setLogs((prev) => [...prev, logEntry])
      } catch (error) {
        console.error("Failed to parse log entry:", error)
      }
    }

    eventSource.onerror = () => {
      setIsConnected(false)
      setTimeout(() => {
        if (eventSourceRef.current?.readyState === EventSource.CLOSED) {
          useLogStream(buildId)
        }
      }, 3000)
    }

    return () => eventSource.close()
  }, [buildId])

  return { logs, isConnected }
}
