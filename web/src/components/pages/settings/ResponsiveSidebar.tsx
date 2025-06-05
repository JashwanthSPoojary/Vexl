"use client"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { SidebarContent } from "./SidebarContent"
import { settingsSections } from "@/lib/utils/settings-page-utils"
import { useState } from "react"

interface Props {
  activeSection: string
  onChange: (id: string) => void
}

export const ResponsiveSidebar = ({ activeSection, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="mb-4">
          <Menu className="h-4 w-4 mr-2" />
          Settings Menu
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader>
          <SheetTitle className="sr-only">Settings Menu</SheetTitle>
        </SheetHeader>

        <SidebarContent
          sections={settingsSections}
          activeSection={activeSection}
          onChange={(id) => {
            onChange(id)
            setIsOpen(false)
          }}
        />
      </SheetContent>
    </Sheet>
  )
}
