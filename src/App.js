// src/App.js
import React, { useState } from "react";
import Auth from "./components/Auth";
import Notes from "./components/Notes";
import FileManager from "./components/FileManager";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <>
          <h1>Добро пожаловать, {user.email}!</h1>
          <Notes />
          <hr />
          <FileManager />
        </>
      )}
    </div>
  );
};

export default App;