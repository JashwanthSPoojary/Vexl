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
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENV PROJECT_DIR=/projects
RUN mkdir -p ${PROJECT_DIR} && chown node:node ${PROJECT_DIR}

USER node
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["npm","start"]


