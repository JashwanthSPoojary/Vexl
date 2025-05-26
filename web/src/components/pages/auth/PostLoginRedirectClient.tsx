"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
type Props = {
  session: {
    user: {
      github_username?: string;
    };
  };
};
export default function PostLoginRedirectClient({ session }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (session.user.github_username) {
      router.replace(`/${session.user.github_username}`);
    }
  }, [session, router]);

  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <Loader2Icon className="animate-spin w-8 h-8" />
    </div>
  );
}
