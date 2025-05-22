interface BuildPayload{
    project_id:string;
    repo_url:string;
    envs:Record<string,string>
}

export type {
    BuildPayload
}