"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildState = void 0;
const redis_client_1 = require("./redis-client");
class BuildState {
    static async track(build_id, project_id) {
        await redis_client_1.redis.hset(`build:${build_id}`, "projectId", project_id, "status", "queued", "createdAt", new Date().toISOString());
    }
    static async updateStatus(build_id, status) {
        await redis_client_1.redis.hset(`build:${build_id}`, 'status', status);
    }
}
exports.BuildState = BuildState;
