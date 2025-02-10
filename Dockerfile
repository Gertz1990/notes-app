# Стадия 1: Сборка React-приложения
FROM node:20 AS frontend-builder

# Устанавливаем рабочую директорию
WORKDIR /app/frontend

# Копируем package.json и package-lock.json
COPY frontend/package.json frontend/package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY frontend/ .

# Собираем React-приложение
RUN npm run build

# Стадия 2: Сборка сервера
FROM node:18 AS backend-builder

# Устанавливаем рабочую директорию
WORKDIR /app/backend

# Копируем package.json и package-lock.json
COPY backend/package.json backend/package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY backend/ .

# Стадия 3: Финальный образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем собранный фронтенд
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Копируем сервер
COPY --from=backend-builder /app/backend ./

# Экспонируем порты
EXPOSE 3000 3001

# Запускаем сервер и React-приложение
CMD npm run server & serve -s frontend/build -l 3000