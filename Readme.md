# Vexl : React Hosting Platform

Instantly host your React application while accessing the GitHub repo’s source, and get a custom subdomain—better than a Vercel domain.  
For example: `yourname.vexl.live`

I made this project to understand how Vercel works and how it deploys React applications. It was a challenging project, mostly due to the system design required for this kind of platform.

---

## Start Up

```bash
git clone https://github.com/JashwanthSPoojary/Vexl.git
cd Vexl
docker-compose -f docker-compose.prod.yml up --build
```

---

## Build Architecture

<p align="center">
  <img src="./docs/build-architecture.png" alt="Build Architecture" width="600" />
</p>

---

## Services

- **build-orchestrator**  
  Orchestrates builds using BullMQ, Redis, and streams logs from Redis to the web via SSE.  
  _Tech: Node.js, Express.js, Redis, BullMQ, dockerode, Prisma_

- **build-worker**  
  Isolated environment spawned by build orchestrator to perform cloning, installing, building, and deploying.  
  _Tech: simple-git, ioredis, aws-sdk_

- **proxy**  
  Proxy server to serve hosted React sites.  
  _Tech: Prisma, Express, http-proxy-middleware_

- **web**  
  Next.js frontend to fetch all repos via GitHub OAuth.  
  _Tech: Octokit, Prisma, shadcn, framer-motion, next-auth, zod, next-themes, ioredis, axios_

- **redis-server**

- **postgres (docker)**

---

## Challenges & Learnings During Building Vexl

- **GitHub Integration:**  
  Used the Octokit/rest library to fetch all user repos, with efficient API limit handling via caching. Filtering for React repos among all others was challenging and led me to learn more about NextAuth’s GitHub OAuth flow under the hood.

- **Webhooks for Redeployment:**  
  Integrated GitHub webhooks to trigger redeployment on any source code change. Learned in-depth about GitHub Developer APIs.

- **Real-Time Logs with Redis & SSE:**  
  First time using Redis: implemented efficient, real-time logs to end users via SSE (Server-Sent Events). Learned why SSE is suited for log streaming from the build orchestrator to the Next.js frontend.

- **Queueing with BullMQ:**  
  Implemented BullMQ with Redis to handle concurrent deployments gracefully, ensuring the system doesn’t crash and can spawn Docker containers as needed.

- **Isolated Build Worker:**  
  Built a worker for tasks like git clone, dependency install, build, and deploy to DigitalOcean Spaces (an S3 wrapper). Learned to safely manage and flow user-provided environment files, securely prompt for system envs inside Docker, and much about Docker internals.

- **Docker Compose & HTTPS:**  
  Learned to efficiently start applications with Docker Compose and set up Let's Encrypt for HTTPS on every deployed project.

- **Writing Better TypeScript:**  
  Improved my code quality using class-based approaches in TypeScript.

---