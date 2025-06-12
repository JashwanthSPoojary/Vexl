# Vexl : React Hosting Platform

Instantly host your React application with direct access to your GitHub repository’s source code, and receive a custom subdomain—superior to a generic Vercel domain.  
For example: `yourname.vexl.live`

I built this project as a way to explore how Vercel operates under the hood, especially how it deploys React applications. The most challenging part was architecting a scalable system to support this platform.

---

## Getting Started

```bash
git clone https://github.com/JashwanthSPoojary/Vexl.git
cd Vexl
docker-compose -f docker-compose.prod.yml up --build
```

---

## Architecture Overview

<p align="center">
  <img src="./docs/build-architecture.png" alt="Build Architecture" width="600" />
</p>

---

## Services

- **build-orchestrator**  
  Coordinates builds using BullMQ and Redis, streaming logs in real time to the web interface via SSE.  
  _Tech: Node.js, Express.js, Redis, BullMQ, dockerode, Prisma_

- **build-worker**  
  Runs in a sandboxed environment, performing tasks such as cloning, installing dependencies, building, and deploying.  
  _Tech: simple-git, ioredis, aws-sdk_

- **proxy**  
  Acts as a gateway, serving hosted React sites.  
  _Tech: Prisma, Express, http-proxy-middleware_

- **web**  
  The Next.js frontend authenticates with GitHub OAuth, allowing users to browse their repositories.  
  _Tech: Octokit, Prisma, shadcn, framer-motion, next-auth, zod, next-themes, ioredis, axios_

- **redis-server**

- **postgres (docker)**

---

## Key Challenges & Learnings

- **GitHub Integration:**  
  Leveraged Octokit/rest to fetch all user repositories, efficiently handling API rate limits with caching. Filtering for React repositories was trickier than expected and deepened my understanding of NextAuth’s GitHub OAuth flow.

- **Webhooks for Automated Redeployment:**  
  Integrated GitHub webhooks to trigger automatic redeployment on every code change. This required a deep dive into the GitHub Developer APIs.

- **Real-Time Logs with Redis & SSE:**  
  My first experience with Redis involved streaming live logs to users via SSE (Server-Sent Events). This taught me why SSE is ideal for log delivery from the build orchestrator to the Next.js frontend.

- **Queueing with BullMQ:**  
  Used BullMQ with Redis to manage concurrent deployments, ensuring stability and seamless spawning of Docker containers for builds.

- **Isolated Build Worker:**  
  Developed a dedicated worker for git cloning, dependency installation, building, and deploying to DigitalOcean Spaces (an S3-compatible service). I learned how to securely handle user-supplied environment files, prompt for system variables within Docker, and gained a deeper understanding of Docker’s inner workings.

- **Docker Compose & HTTPS:**  
  Gained hands-on experience efficiently managing multi-service applications with Docker Compose, and setting up automated HTTPS using Let’s Encrypt for every deployed project.

- **Writing Better TypeScript:**  
  Enhanced my codebase by adopting class-based patterns, leading to more robust and maintainable TypeScript.

---
