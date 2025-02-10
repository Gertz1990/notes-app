# Стадия 1: Сборка React-приложения
FROM node:18 AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Стадия 2: Сборка сервера
FROM node:18 AS backend-builder

WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/ .

# Стадия 3: Финальный образ
FROM node:18

WORKDIR /app
COPY --from=frontend-builder /app/frontend/build ./frontend/build
COPY --from=backend-builder /app/backend ./

EXPOSE 3000 3001

# Используем JSON array form для CMD
CMD ["sh", "-c", "npm run server & serve -s frontend/build -l 3000"]