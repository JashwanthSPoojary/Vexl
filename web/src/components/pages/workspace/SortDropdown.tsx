"use client";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type SortOption = {
  label: string;
  value: string;
};

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SortDropdown({
  options,
  value,
  onChange,
  className,
}: SortDropdownProps) {
  const selectedOption =
    options.find((option) => option.value === value) || options[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("text-sm whitespace-nowrap", className)}
        >
          {selectedOption.label}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className={option.value === value ? "bg-accent" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
