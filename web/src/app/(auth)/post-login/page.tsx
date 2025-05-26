import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authoptions";
import PostLoginRedirectClient from "@/components/pages/auth/PostLoginRedirectClient";

export default async function PostLoginRedirectPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return <PostLoginRedirectClient session={session} />;
}