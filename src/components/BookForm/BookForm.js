import { useEffect, useState } from "react";

import "./BookForm.css";

const BookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [amountPages, setAmountPages] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Check form");
      setFormValid(
        title !== "" && author !== "" && amountPages !== "" && date !== ""
      );
    }, 500);

    return () => {
      console.log("Cleanup");
      clearTimeout(timer);
    };
  }, [title, author, amountPages, date]);

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const changeAuthorHandler = (event) => {
    setAuthor(event.target.value);
  };

  const changeDateHandler = (event) => {
    setDate(event.target.value);
  };

  const changeAmountPagesHandler = (event) => {
    setAmountPages(event.target.value);
  };

  const addBookHandler = (event) => {
    event.preventDefault();
    const newBook = {
      id: Math.random(),
      title,
      author,
      date: new Date(date),
      amountPages,
    };
    onBookAdded(newBook);
  };

  return (
    <form>
      <div className="new-book-controls">
        <div className="new-book-control">
          <label>Título</label>
          <input
            onChange={changeTitleHandler}
            type="text"
            className="input-control"
          />
        </div>
        <div className="new-book-control">
          <label>Autor</label>
          <input
            onChange={changeAuthorHandler}
            type="text"
            className="input-control"
          />
        </div>
        <div className="new-book-control">
          <label>Páginas</label>
          <input
            onChange={changeAmountPagesHandler}
            type="number"
            className="input-control"
            min="1"
            step="1"
          />
        </div>
        <div className="new-book-control">
          <label>¿Cuándo terminaste de leerlo?</label>
          <input
            onChange={changeDateHandler}
            type="date"
            className="input-control"
            min="2019-01-01"
            max="2023-12-31"
          />
        </div>
      </div>
      <div className="new-book-actions">
        <button disabled={!formValid} onClick={addBookHandler}>
          Agregar lectura
        </button>
      </div>
    </form>
  );
};

export default BookForm;
