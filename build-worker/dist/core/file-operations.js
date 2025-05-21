"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
class Project {
    id;
    dir;
    constructor(id) {
        this.id = id;
        this.dir = path_1.default.join(process.env.PROJECTS_DIR || "/projects", id);
    }
    async ensureDir() {
        await promises_1.default.mkdir(this.dir, { recursive: true });
    }
    async writeFile(relativePath, content) {
        await promises_1.default.writeFile(path_1.default.join(this.dir, relativePath), content);
    }
    async readFile(relativePath) {
        return promises_1.default.readFile(path_1.default.join(this.dir, relativePath), "utf-8");
    }
    async exists(relativePath) {
        try {
            await promises_1.default.access(path_1.default.join(this.dir, relativePath));
            return true;
        }
        catch {
            return false;
        }
    }
    async cleanup() {
        await promises_1.default.rm(this.dir, { recursive: true });
    }
}
exports.Project = Project;
