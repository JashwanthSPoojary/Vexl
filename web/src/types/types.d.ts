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
  url: string | null 
  icon: string 
  iconBg: string 
  repo: string 
  createdAt: string 
}
export interface LogEntry {
  timestamp: string
  level: "info" | "error" | "warn"
  message: string
}
export interface SettingsProject {
  id: string
  name: string
  domains: Domain[]
  environments: Environment[]
}
export interface Domain {
  id: string
  name: string
  isPrimary: boolean
}
export interface Environment {
  id: string
  name: string
  branch: string
  url?: string
}
export interface SettingsContextType {
  project: Project
  isLoading: boolean
  error: Error | null
  updateProject: (updates: Partial<Project>) => Promise<void>
}


export type SortBy = "created" | "updated" | "pushed" | "full_name";
export type EnvVar = { key: string; value: string };
export type DeployURL = {
  show:boolean,
  url:string
}
export type SortOption = {
  label: string
  value: string
}
export type SortKey = "name" | "date" | "url"
export type SettingsSection = "general" | "domains" | "environments"