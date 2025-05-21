FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine 
WORKDIR /app
RUN apk add --no-cache git 
COPY --from=builder /app/package.json  ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
ENV PROJECT_DIR=/projects
RUN mkdir -p ${PROJECT_DIR} && chown node:node ${PROJECT_DIR}

USER node
CMD ["npm","start"]


