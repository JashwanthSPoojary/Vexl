import { useCallback, useRef } from "react"

export function useAutoScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldAutoScrollRef = useRef(true)

  const scrollToBottom = useCallback(() => {
    if (shouldAutoScrollRef.current && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [])

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      shouldAutoScrollRef.current = scrollTop + clientHeight >= scrollHeight - 10
    }
  }, [])

  return { containerRef, handleScroll, scrollToBottom }
}
