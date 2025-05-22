import Docker from 'dockerode'
import { BuildPayload } from '../types/types';
export class WorkerManager {
    private docker = new Docker();
    async triggerBuild(build_id:string,payload:BuildPayload){
        await this.docker.run(
            'build-worker',
            [],
            process.stdout,
            {
                Env:[
                    `BUILD_ID=${build_id}`,
                    `PROJECT_ID=${payload.project_id}`,
                    `REPO_URL=${payload.repo_url}`,
                    `ENVS_JSON=${JSON.stringify(payload.envs)}`,
                    `REDIS_URL=${process.env.REDIS_URL}`
                ],
                HostConfig:{
                    AutoRemove:true,
                    Memory:2 * 1024 * 1024 * 1024
                }
            },
        )
    }
}