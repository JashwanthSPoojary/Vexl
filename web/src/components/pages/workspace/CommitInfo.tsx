interface CommitInfoProps {
  message: string
  date: string
  branch?: string
}

export function CommitInfo({ message, date, branch }: CommitInfoProps) {
  return (
    <div className="text-xs sm:text-sm">
      <p className="text-card-foreground truncate">{message}</p>
      <div className="flex items-center mt-1 text-muted-foreground text-xs">
        <span>{date}</span>
        {branch && (
          <>
            <span className="mx-1">on</span>
            <div className="flex items-center">
              <svg className="h-3 w-3 mr-1" viewBox="0 0 16 16" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"
                ></path>
              </svg>
              <span className="truncate max-w-[100px]">{branch}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
