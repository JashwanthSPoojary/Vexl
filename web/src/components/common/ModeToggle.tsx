"use client";
import { SunMoon, MoonStar } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-8 w-8 rounded-md hover:bg-muted transition-colors cursor-pointer"
    >
      {isDark ? (
        <SunMoon className="h-5 w-5" /> 
      ) : (
        <MoonStar className="h-5 w-5" />
      )}

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
