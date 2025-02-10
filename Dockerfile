# Стадия 1: Сборка React-приложения
FROM node:18 AS frontend-builder

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