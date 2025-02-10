// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const express = require("express"); // Добавьте express

// Настройка Multer для загрузки файлов
const upload = multer({ dest: "uploads/" });

// Порт сервера
const PORT = 3001;

// Используем middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Загрузка файлов
server.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Файл не был отправлен.");
  }

  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, "uploads", req.file.originalname);

  // Перемещаем файл из временной папки в целевую
  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ url: `http://localhost:${PORT}/uploads/${req.file.originalname}` });
  });
});

// Удаление файлов
server.delete("/delete-file/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "uploads", fileName);

  // Удаляем файл с сервера
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.sendStatus(200);
  });
});

// Статические файлы
server.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Используйте express.static

// Роутер API
server.use(router);

// Запуск сервера
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});