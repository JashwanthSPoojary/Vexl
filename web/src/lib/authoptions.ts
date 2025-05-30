import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import db from "./prisma";

const GITHUB_ID = process.env.GITHUB_ID ?? "";
const GITHUB_SECRET = process.env.GITHUB_SECRET ?? "";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user repo user:email admin:repo_hook",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile, account }) {
      if (account?.provider === "github") {
        await db.user.upsert({
          where: { githubId: account.providerAccountId },
          update: {
            githubUsername: profile?.login,
            email: profile?.email,
            name: profile?.name,
            avatarUrl: profile?.avatar_url,
          },
          create: {
            githubId: account.providerAccountId,
            githubUsername: profile?.login || "",
            email: profile?.email || "",
            name: profile?.name,
            avatarUrl: profile?.avatar_url,
          },
        });
      }
      return true;
    },
    async jwt({ token, profile, account }) {
      if (!profile?.id) return token;
      if (!account?.access_token) return token;
      token.github_username = profile.login;
      token.github_access_token = account.access_token;
      return token;
    },
    async session({ session, token }) {
      if (!token) return session;
      session.user.github_username = token.github_username as string;
      session.user.github_access_token = token.github_access_token as string;
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/post-login`;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
