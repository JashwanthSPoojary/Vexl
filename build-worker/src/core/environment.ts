import { Project } from "./file-operations";

export class Environment {
  static async inject(project: Project, envs: Record<string, string>) {
    const content = Object.entries(envs)
      .map(([key, value]) => `${key}=${value}`)
      .join("/n");
    await project.writeFile(".env", content);
  }
}
