import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import LandingPage from "@/components/pages/landing/LandingPage";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
  return redirect(`/${session.user.github_username}`)
  }
  return <LandingPage/>

}
