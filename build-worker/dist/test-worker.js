"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("./core/builder");
const build_state_1 = require("./core/build-state");
const test_params = {
    BUILD_ID: "1234",
    PROJECT_ID: "abcd123",
    REPO_URL: "https://github.com/JashwanthSPoojary/fresh-react-project.git",
    ENVS: {
        NODE_ENV: 'production',
        CUSTOM_VAR: 'test_value'
    }
};
const builder = new builder_1.Builder();
(async () => {
    try {
        await build_state_1.BuildState.track(test_params.BUILD_ID, test_params.PROJECT_ID);
        await build_state_1.BuildState.updateStatus(test_params.BUILD_ID, "building");
        await builder.build(test_params.REPO_URL, test_params.PROJECT_ID, test_params.BUILD_ID, test_params.ENVS);
        await build_state_1.BuildState.updateStatus(test_params.BUILD_ID, "success");
        process.exit(0);
    }
    catch (error) {
        await build_state_1.BuildState.updateStatus(test_params.BUILD_ID, 'failed');
        process.exit(1);
    }
})();
