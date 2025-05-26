import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    const username = session.user.github_username;
    redirect(`/${username}`);
  }
  return (
    <>
    </>
  );
}
