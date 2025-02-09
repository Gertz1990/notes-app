// src/components/Notes.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { saveFile, getFile, deleteFile } from "../storage";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [file, setFile] = useState(null);

  // Загрузка заметок
  useEffect(() => {
    const fetchNotes = async () => {
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      setNotes(savedNotes);
    };
    fetchNotes();
  }, []);

  // Добавление заметки
  const addNote = async () => {
    if (newNote.trim() !== "") {
      const note = { text: newNote, fileId: Date.now() }; // Генерируем уникальный ID для файла
      setNotes([...notes, note]);
      localStorage.setItem("notes", JSON.stringify([...notes, note]));

      // Если есть файл, сохраняем его
      if (file) {
        await saveFile(note.fileId, file);
      }

      setNewNote("");
      setFile(null); // Очищаем файл
    }
  };

  // Удаление заметки
  const deleteNote = async (id) => {
    const updatedNotes = notes.filter((note) => note.fileId !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    // Удаляем связанный файл
    await deleteFile(id);
  };

  // Загрузка файла
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div>
      <h2>Мои заметки</h2>
      <textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Введите текст заметки..."
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={addNote}>Добавить заметку</button>

      <div>
        {notes.map((note) => (
          <motion.div
            key={note.fileId}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="note"
          >
            <p>{note.text}</p>
            {note.fileId && (
              <button
                onClick={async () => {
                  const file = await getFile(note.fileId);
                  if (file) {
                    const url = URL.createObjectURL(file);
                    window.open(url, "_blank"); // Открываем файл в новой вкладке
                  }
                }}
              >
                Просмотреть файл
              </button>
            )}
            <button onClick={() => deleteNote(note.fileId)}>Удалить</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notes;