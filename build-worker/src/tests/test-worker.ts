import { Builder } from "../services/builder";
import { BuildState } from "../core/build-state";
const test_params = {
  BUILD_ID: "1234",
  PROJECT_ID: "abcd123",
  REPO_URL: "https://github.com/JashwanthSPoojary/fresh-react-project.git",
  ENVS: {
    NODE_ENV: "production",
    CUSTOM_VAR: "test_value",
  },
};

const builder = new Builder();
(async () => {
  try {
    await BuildState.track(test_params.BUILD_ID, test_params.PROJECT_ID);
    await BuildState.updateStatus(test_params.BUILD_ID, "building");

    await builder.build(
      test_params.REPO_URL,
      test_params.PROJECT_ID,
      test_params.BUILD_ID,
      test_params.ENVS
    );

    await BuildState.updateStatus(test_params.BUILD_ID, "success");
    process.exit(0);
  } catch (error) {
    await BuildState.updateStatus(test_params.BUILD_ID, "failed");
    process.exit(1);
  }
})();
