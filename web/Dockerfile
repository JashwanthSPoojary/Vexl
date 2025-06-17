FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm ci

FROM base AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_ORCHESTRATOR_URL
ARG NEXT_PUBLIC_DEPLOY_DOMAIN
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_ORCHESTRATOR_URL=https://vexlapi.jashwanth.me
ENV NEXT_PUBLIC_DEPLOY_DOMAIN=vexl.live
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY prisma ./prisma
RUN npx prisma generate
RUN npm run build

FROM base AS runner
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 --ingroup nodejs nextjs
ENV NODE_ENV=production
COPY package.json ./
COPY  --from=builder /app/.next/standalone ./
COPY  --from=builder /app/.next/static ./.next/static
COPY  --from=builder /app/public ./public

USER nextjs
EXPOSE 3000
CMD [ "node","server.js" ]





