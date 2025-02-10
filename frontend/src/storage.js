// src/storage.js
import localforage from "localforage";

// Инициализация хранилища
localforage.config({
  driver: localforage.INDEXEDDB, // Используем IndexedDB
  name: "notes-app",
  storeName: "files",
});

// Сохранение файла
export async function saveFile(id, file) {
  try {
    await localforage.setItem(id, file);
    console.log("Файл сохранен:", id);
  } catch (error) {
    console.error("Ошибка при сохранении файла:", error);
  }
}

// Получение файла
export async function getFile(id) {
  try {
    const file = await localforage.getItem(id);
    return file;
  } catch (error) {
    console.error("Ошибка при получении файла:", error);
    return null;
  }
}

// Удаление файла
export async function deleteFile(id) {
  try {
    await localforage.removeItem(id);
    console.log("Файл удален:", id);
  } catch (error) {
    console.error("Ошибка при удалении файла:", error);
  }
}

// Получение всех файлов
export async function getAllFiles() {
  try {
    const files = [];
    await localforage.iterate((value, key) => {
      files.push({ id: key, file: value });
    });
    return files;
  } catch (error) {
    console.error("Ошибка при получении файлов:", error);
    return [];
  }
}