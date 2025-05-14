# Etapa de build
FROM node:20.18.2-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de execução
FROM node:20.18.2-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./

RUN npm install --omit=dev

CMD ["node", "dist/server.js"]