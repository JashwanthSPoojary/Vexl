import DashboardLayout from "@/components/pages/workspace/DashboardLayout";
import { authOptions } from "@/lib/authoptions";
import db from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params:Promise<{workspace:string}>
}>) {7
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  const { workspace } = await params;
  const user = await db.user.findUnique({
    where: { email: session.user.email as string },
  });
  if (!user || user.githubUsername !== workspace) {
    return redirect("/login");
  }
  return (
    <DashboardLayout session={session}>
      {children}
    </DashboardLayout>
  );
}
