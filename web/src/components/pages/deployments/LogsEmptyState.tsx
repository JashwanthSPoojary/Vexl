interface LogsEmptyStateProps {
  originalLogsEmpty: boolean
}

export function LogsEmptyState({ originalLogsEmpty }: LogsEmptyStateProps) {
  return (
    <div className="flex items-center justify-center h-full min-h-[200px] px-4 text-center opacity-60">
      <div>
        <div className="mb-2 text-lg">$</div>
        <div>{originalLogsEmpty ? "Waiting for logs..." : "No logs match your search"}</div>
      </div>
    </div>
  )
}
