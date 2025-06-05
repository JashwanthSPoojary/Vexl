"use client";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dispatch, SetStateAction, useMemo } from "react";
import { SortKey } from "@/types/types";

export type SortOption = {
  label: string;
  value: string;
};

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  selectedSort:string
  setSelectedSort:Dispatch<SetStateAction<string>>
}

export function SortDropdown({
  options,
  value,
  onChange,
  className,
  selectedSort,
  setSelectedSort
}: SortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button
          variant="outline"
          className={cn("text-sm whitespace-nowrap", className)}
        >
          {selectedSort?selectedSort:options[0].label}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="!bg-background">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() =>{
              onChange(option.value);
              setSelectedSort(option.label);
            }}
            className={option.value === value ? "bg-accent" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
