import { useEffect, useState } from "react";

import NewBook from "../NewBook/NewBook";
import BooksFilter from "../bookFilter/BookFilter";
import Books from "../books/Books";
const BOOKS = [
  {
    id: 1,
    title: "100 años de soledad",
    author: "Gabriel García Marquez",
    dateRead: new Date(2021, 8, 12),
    amountPages: 410,
  },
  {
    id: 2,
    title: "Todos los fuegos el fuego",
    author: "Julio Cortazar",
    dateRead: new Date(2020, 6, 11),
    amountPages: 197,
  },
  {
    id: 3,
    title: "Asesinato en el Orient Express",
    author: "Agatha Christie",
    dateRead: new Date(2021, 5, 9),
    amountPages: 256,
  },
  {
    id: 4,
    title: "Las dos torres",
    author: "J.R.R Tolkien",
    dateRead: new Date(2020, 3, 22),
    amountPages: 352,
  },
];

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [yearFiltered, setYearFiltered] = useState("2023");

  useEffect(() => {
    fetch("http://localhost:8080/books/getAll", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((bookData) => {
        const booksMapped = bookData.map((book) => ({
          ...book,
          date: new Date(book.date),
        }));
        setBooks(booksMapped);
      })
      .catch((error) => console.log(error));
  }, [books]);

  const addBookHandler = (book) => {
    const dateString = book.date.toISOString().slice(0, 10);

    fetch("http://localhost:8080/books/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: book.title,
        author: book.author,
        date: dateString,
        amountPages: parseInt(book.amountPages, 10),
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("The response had some errors");
        }
      })
      .then(() => {
        const newBooksArray = [book, ...books];
        setBooks(newBooksArray);
      })
      .catch((error) => console.log(error));
  };

  const handleFilterChange = (year) => {
    setYearFiltered(year);
  };

  return (
    <>
      <h1>Books Champion App!</h1>
      <h3>¡Quiero leer libros!</h3>
      <NewBook onBookAdded={addBookHandler} />
      <BooksFilter
        yearFiltered={yearFiltered}
        onYearChange={handleFilterChange}
      />
      <Books yearFiltered={yearFiltered} books={books} />
    </>
  );
};

export default Dashboard;
