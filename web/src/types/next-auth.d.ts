import "next-auth";

declare module "next-auth" {
  interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    image?: string;
    id?: string;
    login?: string;
    avatar_url?: string
  }
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      github_username?: string;
      github_access_token?: string;
    };
  }
  interface JWT {
    github_id?: string; // or number
    github_access_token?: string;
  }
}
