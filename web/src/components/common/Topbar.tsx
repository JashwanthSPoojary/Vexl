import { ModeToggle } from "@/components/common/ModeToggle";
import { LayoutGrid } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import Logout from "../pages/workspace/Logout";
export default function Topbar({ session }: { session: Session }) {
  const user = session.user;
  return (
    <nav>
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <Link
            href={`/${user.github_username}`}
            className="flex items-center gap-3 group"
          >
            <div className="flex items-center justify-center rounded-md p-1 transition-colors group-hover:bg-muted/60">
              <LayoutGrid className="h-5 w-5 text-foreground fill-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight text-foreground">
                Vexl
              </span>
              <span className="text-[11px] text-muted-foreground">
                of {user.name}
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Logout session={session} />
        </div>
      </header>
    </nav>
  );
}
