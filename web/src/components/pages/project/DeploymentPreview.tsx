import Image from "next/image"

export function DeploymentPreview() {
  return (
    <div className="flex-1 bg-muted/30 rounded-lg border border-border overflow-hidden">
        <div className="relative w-full h-64 sm:h-80 lg:h-[400px]">
          <Image src="https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Deployment preview" fill className="object-cover" />
        </div>
    </div>
  )
}
