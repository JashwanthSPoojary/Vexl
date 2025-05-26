interface ProjectIconProps {
  icon: string
  background: string
  size?: "sm" | "md" | "lg"
}

export function ProjectIcon({ icon, background, size = "md" }: ProjectIconProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  return (
    <div
      className={`flex items-center justify-center ${sizeClasses[size]} rounded-full text-white font-medium`}
      style={{ background }}
    >
      {icon}
    </div>
  )
}
