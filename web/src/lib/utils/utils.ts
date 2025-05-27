import { EnvVar } from "@/types/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function convertEnvArrayToRecord(envArray: EnvVar[]): Record<string, string> {
  return envArray.reduce((acc, { key, value }) => {
    if (key.trim()) acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
}

