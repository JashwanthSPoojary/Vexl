import { Session } from "next-auth";
import Topbar from "../../common/Topbar";

export default function DashboardLayout({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col mb-10 sm:mb-4 lg:mb-0">
      <Topbar session={session} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
