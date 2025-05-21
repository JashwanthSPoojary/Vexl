import { GithubService } from "./github-service";
import { UploadService } from "./upload-service";
import { Environment } from "../core/environment";
import { Project } from "../core/file-operations";
import { Logger } from "../core/logger";

export class Builder {
  private git = new GithubService();
  private upload = new UploadService();
  async build(
    repo_url: string,
    project_id: string,
    build_id: string,
    envs: Record<string, string>
  ) {
    const project = new Project(project_id);
    const logger = new Logger(project_id, build_id);
    try {
      logger.log(`Cloning repository: ${repo_url}`);
      await this.git.gitClone(repo_url, project);
      logger.log("Repository cloned successfully");

      logger.log("Injecting environment variables");
      await Environment.inject(project, envs);
      logger.log("Environment variables injected");

      logger.log("Installing dependencies...");
      await this.installDependencies(project);
      logger.log("Dependencies installed");

      logger.log("Starting build process");
      await this.runBuild(project);
      logger.log("Build completed");

      logger.log("Uploading to DigitalOcean Spaces");
      await this.upload.deploy(project_id, logger);
      logger.log("Build pipeline completed");
      return { success: true };
    } catch (error) {
      await project.cleanup().catch(() => {});
      logger.error(`Build failed: ${error}`);
      throw Error(`Error : ${error}`);
    }
  }
  private async installDependencies(project: Project) {
    const { execa } = await import("execa");
    await execa("npm", ["install"], { cwd: project.dir });
  }
  private async runBuild(project: Project) {
    const { execa } = await import("execa");
    await execa("npm", ["run", "build"], { cwd: project.dir });
  }
}
