"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("./core/builder");
const build_state_1 = require("./core/build-state");
const { BUILD_ID, PROJECT_ID, REPO_URL, ENVS_JSON } = process.env;
if (!BUILD_ID || !PROJECT_ID || !REPO_URL) {
    process.exit(1);
}
const envs = JSON.parse(ENVS_JSON || "{}");
const builder = new builder_1.Builder();
(async () => {
    try {
        await build_state_1.BuildState.track(BUILD_ID, PROJECT_ID);
        await build_state_1.BuildState.updateStatus(BUILD_ID, "building");
        await builder.build(REPO_URL, PROJECT_ID, BUILD_ID, envs);
        await build_state_1.BuildState.updateStatus(BUILD_ID, "success");
        process.exit(0);
    }
    catch (error) {
        await build_state_1.BuildState.updateStatus(BUILD_ID, 'failed');
        process.exit(1);
    }
})();
