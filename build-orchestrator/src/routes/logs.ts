import { Router } from "express";
import { redis } from "../lib/redis-client";

const router = Router();

router.get('/builds/:id/logs', (req, res) => {
    res.setHeader("Content-Type","text/event-stream");
    res.flushHeaders();

    const channel = `logs:${req.params.id}`;
    const pubsub = redis.duplicate();

    pubsub.subscribe(channel,(err)=>{
        if (err) {
            console.error('Redis subscribe error:', err);
            res.status(500).end();
        }
    });
    pubsub.on("message",(ch,message)=>{
        if(ch===channel) res.write(`data: ${message}\n\n`)
    });
    req.on("close",()=>pubsub.unsubscribe(channel));
});

export default router;

