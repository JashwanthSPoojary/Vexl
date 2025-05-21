import { Project } from "../core/file-operations";
import { simpleGit } from "simple-git";
export class GithubService {
  async gitClone(repo_url: string, project: Project) {
    try {
      await project.ensureDir();
      const git = simpleGit();
      await git.clone(repo_url, project.dir);
    } catch (error) {
      throw new Error(`Git clone failed: ${error}`);
    }
  }
}
