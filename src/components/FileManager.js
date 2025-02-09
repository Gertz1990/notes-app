// src/components/FileManager.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { saveFile, getAllFiles, deleteFile, getFile } from "../storage"; // Добавьте 'getFile'

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Загрузка всех файлов
  useEffect(() => {
    const fetchFiles = async () => {
      const allFiles = await getAllFiles();
      setFiles(allFiles);
    };
    fetchFiles();
  }, []);

  // Обработка загрузки файла
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 200 * 1024 * 1024) { // 200 МБ
      alert("Файл слишком большой! Максимальный размер: 200 МБ.");
      return;
    }
    setSelectedFile(file);
  };

  // Сохранение файла
  const handleUpload = async () => {
    if (!selectedFile) return;

    const fileId = Date.now(); // Генерируем уникальный ID
    await saveFile(fileId, selectedFile);

    // Обновляем список файлов
    setFiles([...files, { id: fileId, file: selectedFile }]);
    setSelectedFile(null); // Очищаем выбранный файл
  };

  // Просмотр файла
  const handleViewFile = async (id) => {
    const file = await getFile(id); // Используем 'getFile'
    if (file) {
      const url = URL.createObjectURL(file);
      window.open(url, "_blank"); // Открываем файл в новой вкладке
    }
  };

  // Удаление файла
  const handleDeleteFile = async (id) => {
    await deleteFile(id);
    setFiles(files.filter((f) => f.id !== id));
  };

  return (
    <div>
      <h2>Менеджер файлов</h2>

      {/* Загрузка файла */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Загрузить файл</button>

      {/* Список файлов */}
      <div>
        {files.length === 0 ? (
          <p>Нет загруженных файлов.</p>
        ) : (
          files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="file"
            >
              <p>{file.file.name}</p>
              <button onClick={() => handleViewFile(file.id)}>Просмотреть</button>
              <button onClick={() => handleDeleteFile(file.id)}>Удалить</button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default FileManager;