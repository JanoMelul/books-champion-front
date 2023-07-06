import { useState } from "react";

import "./BookItem.css";

import BookCard from "../bookCard/BookCard";
import DateRead from "../dateRead/DateRead";

const BookItem = ({ title, author, date, amountPages }) => {
  const [bookTitle, setBookTitle] = useState(title);
  const [bookAuthor, setBookAuthor] = useState("");

  const clickChangeTitleHandler = () => {
    console.log("clicked");
    setBookTitle("Actualizado!");
  };

  return (
    <BookCard>
      <h2>{bookTitle}</h2>
      <h3>{author}</h3>
      <DateRead date={date} />
      <p>{amountPages} páginas</p>
      <button onClick={clickChangeTitleHandler}>Cambiar titulo</button>
    </BookCard>
  );
};

export default BookItem;
