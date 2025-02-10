// src/components/FileManager.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Загрузка всех файлов из базы данных
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/files");
        setFiles(response.data);
      } catch (error) {
        toast.error("Ошибка при загрузке файлов: " + error.message);
      }
    };
    fetchFiles();
  }, []);

  // Обработка выбора файла
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Файл слишком большой! Максимальный размер: 5 МБ.");
      return;
    }
    setSelectedFile(file);
  };

  // Загрузка файла на сервер
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Выберите файл для загрузки");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Отправляем файл на сервер
      const response = await axios.post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Сохраняем информацию о файле в базе данных
      await axios.post("http://localhost:3001/files", {
        name: selectedFile.name,
        url: response.data.url,
      });

      // Обновляем список файлов без перезагрузки страницы
      setFiles((prevFiles) => [
        ...prevFiles,
        { id: Date.now(), name: selectedFile.name, url: response.data.url },
      ]);

      toast.success("Файл успешно загружен!");
      setSelectedFile(null);
    } catch (error) {
      toast.error("Ошибка при загрузке файла: " + error.message);
    }
  };

  // Удаление файла
  const handleDeleteFile = async (id, name) => {
    try {
      // Удаляем файл с сервера
      await axios.delete(`http://localhost:3001/delete-file/${name}`);

      // Удаляем файл из базы данных
      await axios.delete(`http://localhost:3001/files/${id}`);

      // Обновляем список файлов без перезагрузки страницы
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));

      toast.success("Файл удален!");
    } catch (error) {
      toast.error("Ошибка при удалении файла: " + error.message);
    }
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
            <div key={file.id}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
              <button onClick={() => handleDeleteFile(file.id, file.name)}>Удалить</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FileManager;