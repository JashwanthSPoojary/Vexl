import { Builder } from "./services/builder";
import { BuildState } from "./core/build-state";
const { BUILD_ID, PROJECT_ID, REPO_URL, ENVS_JSON } = process.env;
console.log("Build server is running");
console.log("Build ID: ");
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
    console.log("building");
    

    await builder.build(REPO_URL, PROJECT_ID, BUILD_ID, envs);

    console.log("built");
    
    await BuildState.updateStatus(BUILD_ID, "success");
    process.exit(0);
  } catch (error) {
    await BuildState.updateStatus(BUILD_ID, "failed");
    process.exit(1);
  }
})();
