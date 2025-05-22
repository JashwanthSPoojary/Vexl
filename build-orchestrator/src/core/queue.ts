import { Queue, Worker } from 'bullmq';
import { redis } from '../lib/redis-client';
import { BuildPayload } from '../types/types';
import { WorkerManager } from './worker-manager';

export class BuildQueue {
    private queue:Queue;
    private worker:Worker;
    constructor(){
        this.queue = new Queue('builds',{
                connection:redis,
                defaultJobOptions:{
                    attempts:3,
                    backoff:{type:"exponential",delay:5000}
                }
            }
        )
        this.worker = new Worker('builds',async job => {
            await new WorkerManager().spawnWorker(job.id!,job.data)
        },{connection:redis,concurrency:2});
    }
    async addQueue(build_id:string,payload:BuildPayload){
        return this.queue.add('build',payload,{
            jobId:build_id
        });
    }
}