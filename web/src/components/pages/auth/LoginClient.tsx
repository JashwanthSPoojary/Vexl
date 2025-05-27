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
        <Link
          href="/"
          className="container mx-auto flex items-center justify-between"
        >
          <LayoutGrid className="h-6 w-6 fill-white" />
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl px-6 py-12 sm:px-10 sm:py-14 bg-black rounded-3xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            Log in to Vexl
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
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0.297C5.37 0.297 0 5.67 0 12.3c0 5.29 3.438 9.773 8.207 11.366.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.807 1.305 3.492.997.11-.776.42-1.305.762-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.49 11.49 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.553 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.625-5.49 5.92.435.375.81 1.11.81 2.24 0 1.615-.015 2.92-.015 3.315 0 .315.21.69.825.57C20.565 22.07 24 17.585 24 12.3 24 5.67 18.63 0.297 12 0.297z" />
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
