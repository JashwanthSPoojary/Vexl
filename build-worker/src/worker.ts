import { Builder } from "./services/builder";
import { BuildState } from "./core/build-state";
const { BUILD_ID, PROJECT_ID, REPO_URL, ENVS_JSON } = process.env;
console.log("hello are you running");
console.log(process.env.BUILD_ID);
if (!BUILD_ID || !PROJECT_ID || !REPO_URL) {
  console.log("not specified !BUILD_ID || !PROJECT_ID || !REPO_URL");
  process.exit(1);
}
const envs = JSON.parse(ENVS_JSON || "{}");
const builder = new Builder();
(async () => {
  try {
    await BuildState.track(BUILD_ID, PROJECT_ID);
    await BuildState.updateStatus(BUILD_ID, "building");

    await builder.build(REPO_URL, PROJECT_ID, BUILD_ID, envs);

    await BuildState.updateStatus(BUILD_ID, "success");
    process.exit(0);
  } catch (error) {
    await BuildState.updateStatus(BUILD_ID, "failed");
    process.exit(1);
  }
})();
