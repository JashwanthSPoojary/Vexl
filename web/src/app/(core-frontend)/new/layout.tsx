import NewWorspaceLayout from "@/components/pages/new/NewWorkspaceLayout";
import { authOptions } from "@/lib/authoptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {7
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  return (
    <NewWorspaceLayout session={session}>
        {children}
    </NewWorspaceLayout>
  );
}
