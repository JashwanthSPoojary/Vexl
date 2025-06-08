import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--vexl-black)]/60">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-3 px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/" className="flex items-center gap-2 text-white">
          <LayoutGrid size={24} fill="white" />
          <span className="text-lg sm:text-2xl font-bold">Vexl</span>
        </Link>

        {/* Nav Items */}
        <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
          <Link
            href="https://github.com/JashwanthSPoojary/Vexl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white hover:opacity-80 transition"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 0C5.37 0 0 5.373 0 12a12.01 12.01 0 008.207 11.386c.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.386-1.333-1.755-1.333-1.755-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.832 2.808 1.303 3.492.996.108-.775.42-1.303.763-1.602-2.664-.308-5.467-1.343-5.467-5.977 0-1.32.47-2.398 1.237-3.243-.124-.307-.536-1.545.118-3.222 0 0 1.008-.323 3.3 1.236a11.508 11.508 0 016.004 0c2.29-1.559 3.296-1.236 3.296-1.236.656 1.677.244 2.915.12 3.222.77.845 1.236 1.923 1.236 3.243 0 4.644-2.807 5.666-5.48 5.97.43.37.816 1.104.816 2.224v3.293c0 .32.192.694.8.577A12.01 12.01 0 0024 12c0-6.627-5.373-12-12-12z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </Link>

          <Link
            href="/login"
            className="bg-[var(--vexl-white)] text-[var(--vexl-black)] px-4 py-2 rounded-md font-medium hover:opacity-90 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
