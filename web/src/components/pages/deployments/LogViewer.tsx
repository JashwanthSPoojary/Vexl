"use client"

import { useEffect, useState } from "react"
import { useLogStream } from "@/hooks/use-log-stream"
import { LogsHeader } from "./LogsHeader"
import { LogsList } from "./LogsList"
import { useAutoScroll } from "@/hooks/use-auto-scroll"
import { useLogFiltering } from "@/hooks/use-log-filtering"
import {  getLogPrefix } from "@/lib/utils/logs-page-utils"
import { DeployURL } from "@/types/types"

interface LogsViewerProps {
  buildId: string
}

export function LogsViewer({ buildId }: LogsViewerProps) {
  const { logs, isConnected } = useLogStream(buildId);
  const { searchQuery, setSearchQuery, filteredLogs } = useLogFiltering(logs)
  const { containerRef, handleScroll, scrollToBottom } = useAutoScroll();
  const [showDeployURL,setShowDeployURL] = useState<DeployURL>({
    show:false,
    url:""
  });
  
  useEffect(() => {
    scrollToBottom()
  }, [filteredLogs, scrollToBottom]);
  useEffect(() => {
  const lastLog = logs[logs.length - 1];

  if (lastLog?.message.includes("Build pipeline completed")) {
    // Show deploy URL or trigger any follow-up action
    setShowDeployURL({show:true,url:"localhost:3000"});
  }
}, [logs]);
  

  return (
    <div className="border rounded-lg bg-background">
      <LogsHeader
        isConnected={isConnected}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        logCount={filteredLogs.length}
        deployUrl={showDeployURL}
      />

      <LogsList
        logs={filteredLogs}
        originalLogs={logs}
        onScroll={handleScroll}
        getLogPrefix={getLogPrefix}
        scrollRef={containerRef}
      />
    </div>
  )
}
