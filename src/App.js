// src/App.js
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./components/Auth";
import Notes from "./components/Notes";
import FileManager from "./components/FileManager";

const App = () => {
  const [user, setUser] = useState(null);

  // Проверяем localStorage при загрузке приложения
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <>
          <h1>Добро пожаловать, {user.email}!</h1>
          <hr />
          <Notes />
          <hr />
          <FileManager />
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;