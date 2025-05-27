export interface Repo {
  id: number;
  name: string;
  clone_url:string;
  description: string | null;
  stars: number;
  forks: number;
  isPrivate: boolean;
  time: string; // if you're setting this manually as formatted time
  updated_at: string;
  language: string | null;
  languageColor: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;
    site_admin: boolean;
  };
}
export interface Project {
  id: string
  name: string
  url: string
  icon: string
  iconBg: string
  repo: string
  lastCommit: {
    message: string
    date: string
    branch: string
  }
}
export interface LogEntry {
  timestamp: string
  level: "info" | "error" | "warn"
  message: string
}

export type SortBy = "created" | "updated" | "pushed" | "full_name";
export type EnvVar = { key: string; value: string };
export type DeployURL = {
  show:boolean,
  url:string
}