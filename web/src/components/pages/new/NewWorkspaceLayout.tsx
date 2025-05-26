import { Session } from "next-auth";
import Topbar from "@/components/common/Topbar";

export default function NewWorspaceLayout({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar session={session}/>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
