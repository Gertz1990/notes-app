// src/components/Notes.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

// Стили
const Container = styled.div`
  padding: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 16px;
  resize: none;

  @media (max-width: 768px) {
    height: 80px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;

  &:hover {
    background-color: #005bb5;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const NoteContainer = styled(motion.div)`
  background-color: #fff;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  position: relative;
`;

const DeleteButton = styled.button`
  background-color: #ff453a;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background-color: #c0392b;
  }
`;

// Компонент
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Загрузка заметок из localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Сохранение заметок в localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Добавление заметки
  const addNote = () => {
    if (newNote.trim() === "") {
      toast.error("Заметка не может быть пустой");
      return;
    }

    const newNoteObj = { id: uuidv4(), text: newNote };
    setNotes([...notes, newNoteObj]);
    setNewNote("");
    toast.success("Заметка добавлена!");
  };

  // Удаление заметки
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    toast.info("Заметка удалена");
  };

  return (
    <Container>
      <h2>Мои заметки</h2>
      <TextArea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Введите текст заметки..."
      />
      <Button onClick={addNote}>Добавить заметку</Button>

      <div>
        {notes.map((note) => (
          <NoteContainer
            key={note.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{note.text}</p>
            <DeleteButton onClick={() => deleteNote(note.id)}>Удалить</DeleteButton>
          </NoteContainer>
        ))}
      </div>
    </Container>
  );
};

export default Notes;