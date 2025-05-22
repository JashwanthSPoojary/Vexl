import { Router } from "express";
import { generateId } from "../lib/utils";
import { WorkerManager } from "../core/worker-manager";
import { redis } from "../lib/redis-client";

const router = Router();
const worker_manager = new WorkerManager();

router.post('/builds',async(req,res)=>{
    const build_id = generateId();
    await worker_manager.spawnWorker(build_id,req.body);
    res.json({ build_id });
});

router.get('/builds/:id/logs',(req,res)=>{
    res.setHeader('Content-type','text/events-stream');
});
