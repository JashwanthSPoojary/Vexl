"use client";

import { ChevronDown, Github, Plus } from "lucide-react";
import { cn } from "@/lib/utils/utils";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface AddNewButtonProps {
  onNewProject?: () => void;
  onImportRepo?: () => void;
  className?: string;
}

export function AddNewButton({ className }: AddNewButtonProps) {
  return (
    <Link href="/new">
      <Button
        className={cn("text-sm whitespace-nowrap cursor-pointer", className)}
      >
        <span className="hidden sm:inline">Add New</span>
        <span className="sm:hidden">New</span>
      </Button>
    </Link>
  );
}
