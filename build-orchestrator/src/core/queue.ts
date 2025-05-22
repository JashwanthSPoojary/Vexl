import { Queue } from 'bullmq';
import { redis } from '../lib/redis-client';
import { BuildPayload } from '../types/types';


export class BuildQueue {
    private queue:Queue;
    constructor(){
        this.queue = new Queue('builds',{
                connection:redis,
                defaultJobOptions:{
                    attempts:3,
                    backoff:{type:"exponential",delay:5000}
                }
            }
        )
    }
    async addQueue(payload:BuildPayload){
        return this.queue.add('build',payload);
    }
}