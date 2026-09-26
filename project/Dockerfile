FROM node:24-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci --omit=dev

WORKDIR /app
COPY backend ./backend
COPY frontend ./frontend

WORKDIR /app/backend
USER node
EXPOSE 5000
CMD ["node", "src/server.js"]
