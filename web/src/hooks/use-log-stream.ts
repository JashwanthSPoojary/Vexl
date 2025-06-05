import { LogEntry } from "@/types/types";
import { useEffect, useRef, useState } from "react";

export function useLogStream(buildId: string) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const url = process.env.NEXT_PUBLIC_ORCHESTRATOR_URL ?? "http://localhost:3001"

  useEffect(() => {
    const connect = () => {
      const eventSource = new EventSource(`${url}/api/builds/${buildId}/logs`)
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => setIsConnected(true);

      eventSource.onmessage = (event) => {
        try {
          const logEntry: LogEntry = JSON.parse(event.data);
          setLogs((prev) => [...prev, logEntry]);
        } catch (error) {
          console.error("Failed to parse log entry:", error);
        }
      };

      eventSource.onerror = () => {
        setIsConnected(false);
        eventSource.close();
        setTimeout(() => {
          connect(); 
        }, 3000);
      };
    };

    connect(); 

    return () => {
      eventSourceRef.current?.close();
    };
  }, [buildId]);

  return { logs, isConnected };
}
