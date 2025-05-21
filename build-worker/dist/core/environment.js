"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
class Environment {
    static async inject(project, envs) {
        const content = Object.entries(envs)
            .map(([key, value]) => `${key}=${value}`)
            .join("/n");
        await project.writeFile(".env", content);
    }
}
exports.Environment = Environment;
