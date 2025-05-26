import LoginClient from "@/components/pages/auth/LoginClient";
import { authOptions } from "@/lib/authoptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    const username =
      session.user.github_username
    redirect(`/${username}`);
  }

  return <LoginClient />;
}
