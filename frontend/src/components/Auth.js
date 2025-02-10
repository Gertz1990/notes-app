// src/components/Auth.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Auth = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      toast.error("Введите email и пароль");
      return;
    }

    try {
      // Проверяем, существует ли пользователь
      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;

      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        toast.error("Пользователь уже зарегистрирован");
        return;
      }

      // Сохраняем пользователя
      await axios.post("http://localhost:3001/users", { email, password });

      // Устанавливаем пользователя и сохраняем в localStorage
      setUser({ email });
      localStorage.setItem("user", JSON.stringify({ email }));
      toast.success("Регистрация успешна!");
    } catch (error) {
      toast.error("Ошибка регистрации: " + error.message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Введите email и пароль");
      return;
    }

    try {
      // Проверяем учетные данные
      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;

      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        toast.error("Неверный email или пароль");
        return;
      }

      // Устанавливаем пользователя и сохраняем в localStorage
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Вход выполнен!");
    } catch (error) {
      toast.error("Ошибка входа: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Войти или зарегистрироваться</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #d2d2d7",
          borderRadius: "8px",
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #d2d2d7",
          borderRadius: "8px",
        }}
      />
      <button
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007aff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Зарегистрироваться
      </button>
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Войти
      </button>
    </div>
  );
};

export default Auth;