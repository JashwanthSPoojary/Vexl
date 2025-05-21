"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const simple_git_1 = require("simple-git");
class GithubService {
    async gitClone(repo_url, project) {
        try {
            await project.ensureDir();
            const git = (0, simple_git_1.simpleGit)();
            await git.clone(repo_url, project.dir);
        }
        catch (error) {
            throw new Error(`Git clone failed: ${error}`);
        }
    }
}
exports.GithubService = GithubService;
