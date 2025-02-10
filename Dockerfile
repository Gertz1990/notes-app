# Стадия 1: Сборка React-приложения
FROM node:18 AS frontend-builder

WORKDIR /app/frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Стадия 2: Сервер
FROM node:18

WORKDIR /app/backend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
COPY --from=frontend-builder /app/frontend/build ./frontend/build

EXPOSE 3000 3001
CMD npm run server & serve -s frontend/build -l 3000