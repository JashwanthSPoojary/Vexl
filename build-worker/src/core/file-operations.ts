import path from "path";
import fs from "fs/promises";

export class Project {
  public dir: string;
  constructor(public id: string) {
    this.dir = path.join(process.env.PROJECTS_DIR || "/projects", id);
  }
  async ensureDir() {
    await fs.mkdir(this.dir, { recursive: true });
  }
  async writeFile(relativePath: string, content: string) {
    await fs.writeFile(path.join(this.dir, relativePath), content);
  }
  async readFile(relativePath: string) {
    return fs.readFile(path.join(this.dir, relativePath), "utf-8");
  }
  async exists(relativePath: string) {
    try {
      await fs.access(path.join(this.dir, relativePath));
      return true;
    } catch {
      return false;
    }
  }
  async cleanup() {
    await fs.rm(this.dir, { recursive: true });
  }
}
