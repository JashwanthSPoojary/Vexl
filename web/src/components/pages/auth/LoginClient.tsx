"use client";

import { LayoutGrid, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginClient() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn("github");
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-4 md:p-6">
        <Link href="/" className="container mx-auto flex items-center justify-between">
          <LayoutGrid className="h-6 w-6 fill-white" />
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl px-6 py-12 sm:px-10 sm:py-14 bg-black rounded-3xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            Log in to DevDeploy
          </h1>

          <div className="space-y-5">
            <button
              disabled={loading}
              onClick={handleLogin}
              className="cursor-pointer bg-white text-black relative w-full py-4 sm:py-6 px-4 sm:px-6 text-base sm:text-lg rounded-lg flex items-center justify-center gap-4 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="relative z-10 flex items-center gap-3">
                  <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 ...z" />
                  </svg>
                  Continue with GitHub
                </span>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
