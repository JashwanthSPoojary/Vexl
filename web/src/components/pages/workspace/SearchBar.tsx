"use client"

import { Loader, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onCommandOpen: () => void
  isLoading?: boolean
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  onCommandOpen,
  isLoading = false,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onCommandOpen()
    }
  }

  return (
    <div className="relative w-full">
      {isLoading ? (
        <Loader className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin" />
      ) : (
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      )}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="pl-10 pr-16 py-5 w-full !bg-background"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground">
        <span className="px-1.5 py-0.5 rounded border border-border">⌘</span>
        <span className="px-1.5 py-0.5 rounded border border-border">K</span>
      </div>
    </div>
  )
}
