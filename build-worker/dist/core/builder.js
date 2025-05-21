"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const github_service_1 = require("../services/github-service");
const upload_service_1 = require("../services/upload-service");
const environment_1 = require("./environment");
const file_operations_1 = require("./file-operations");
const logger_1 = require("./logger");
class Builder {
    git = new github_service_1.GithubService();
    upload = new upload_service_1.UploadService();
    async build(repo_url, project_id, build_id, envs) {
        const project = new file_operations_1.Project(project_id);
        const logger = new logger_1.Logger(project_id, build_id);
        try {
            logger.log(`Cloning repository: ${repo_url}`);
            await this.git.gitClone(repo_url, project);
            logger.log('Repository cloned successfully');
            logger.log('Injecting environment variables');
            await environment_1.Environment.inject(project, envs);
            logger.log('Environment variables injected');
            logger.log('Installing dependencies...');
            await this.installDependencies(project);
            logger.log('Dependencies installed');
            logger.log('Starting build process');
            await this.runBuild(project);
            logger.log('Build completed');
            logger.log('Uploading to DigitalOcean Spaces');
            await this.upload.deploy(project_id, logger);
            logger.log('Build pipeline completed');
            return { success: true };
        }
        catch (error) {
            await project.cleanup().catch(() => { });
            logger.error(`Build failed: ${error}`);
            throw Error(`Error : ${error}`);
        }
    }
    async installDependencies(project) {
        const { execa } = await import("execa");
        await execa("npm", ["install"], { cwd: project.dir });
    }
    async runBuild(project) {
        const { execa } = await import("execa");
        await execa("npm", ["run", "build"], { cwd: project.dir });
    }
}
exports.Builder = Builder;
