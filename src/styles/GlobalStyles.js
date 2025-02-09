// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* Глобальные стили */
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #f5f5f7;
    color: #1d1d1f;
    margin: 0;
    padding: 0;
    line-height: 1.6;
  }

  h1, h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 28px;
  }

  h2 {
    font-size: 24px;
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #d2d2d7;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 10px;
    resize: none; /* Запрещаем изменение размера */
  }

  button {
    background-color: #007aff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 10px;
    display: inline-block; /* Убираем растяжение на всю ширину */
    max-width: fit-content; /* Кнопка занимает только необходимую ширину */
  }

  button:hover {
    background-color: #005bb5;
  }

  .note {
    background-color: #fff;
    border: 1px solid #d2d2d7;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    position: relative;
    display: flex; /* Используем flexbox для выравнивания */
    align-items: flex-start; /* Выравниваем по верхнему краю */
  }

  .note p {
    flex-grow: 1; /* Текст занимает всё доступное пространство */
    margin: 0;
  }

  .note button {
    background-color: #ff453a;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 10px; /* Отступ от текста */
    display: inline-block; /* Убираем растяжение */
  }

  .note button:hover {
    background-color: #c0392b;
  }

  /* Стили для менеджера файлов */
  .file {
    background-color: #fff;
    border: 1px solid #d2d2d7;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .file p {
    margin: 0;
    flex-grow: 1;
  }

  .file button {
    background-color: #007aff;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 10px;
    display: inline-block; /* Убираем растяжение */
  }

  .file button:hover {
    background-color: #005bb5;
  }

  /* Адаптация для мобильных устройств */
  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
    }

    h2 {
      font-size: 20px;
    }

    textarea {
      height: 80px;
      font-size: 14px;
    }

    button {
      font-size: 14px;
    }

    .note {
      flex-direction: column; /* На маленьких экранах текст и кнопка в колонку */
      align-items: flex-start;
    }

    .note button {
      margin-left: 0;
      margin-top: 10px; /* Отступ сверху для кнопки удаления */
    }

    .file {
      flex-direction: column;
      align-items: flex-start;
    }

    .file button {
      margin-left: 0;
      margin-top: 10px;
    }
  }
`;