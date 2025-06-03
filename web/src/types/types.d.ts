export interface Repo {
  id: number;
  name: string;
  clone_url: string;
  html_url: string;
  description: string;
  stars: number;
  forks: number;
  isPrivate: boolean;
  time: string; // Formatted relative time
  updated_at: string;
  language: string;
  languageColor: string;
  owner: string; // This is now the owner's login string
  repoOwner: string;
  repoName: string;
  defaultBranch: string;
}
export interface RepoFetchResult {
  success: boolean;
  message: string;
  data: any[];
}
export interface DeployProjectResult {
  success: boolean;
  message: string;
  data: Record<string,string>;
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
  domain: Domain
  environments: Environment[]
}
export interface Domain {
  old_domain:string,
  new_name:string
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
export type SettingsSection = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}