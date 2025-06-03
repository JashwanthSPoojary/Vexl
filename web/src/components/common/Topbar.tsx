import { ModeToggle } from "@/components/common/ModeToggle";
import { Session } from "next-auth";
import Logout from "../pages/workspace/Logout";
import { UserProjectsLink } from "./UseProjectLink";

export default function Topbar({ session }: { session: Session }) {
  const user = session.user;

  return (
    <nav>
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
        <div className="mx-auto px-4 sm:px-6 md:px-10 lg:px-20 flex items-center justify-between h-14">
          <UserProjectsLink githubUsername={user.github_username}/>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Logout session={session} />
          </div>
        </div>
      </header>
    </nav>
  );
}
