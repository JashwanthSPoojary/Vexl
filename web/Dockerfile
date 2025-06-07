FROM node:18-alpine AS builder
WORKDIR /app
ARG NEXT_PUBLIC_ORCHESTRATOR_URL
ENV NEXT_PUBLIC_ORCHESTRATOR_URL=https://vexlapi.jashwanth.me
COPY package*.json ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate
COPY . . 
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY  --from=builder /app/.next ./.next
COPY  --from=builder /app/public ./public
COPY  --from=builder /app/prisma ./prisma

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

EXPOSE 3000
CMD [ "npm","start" ]





