import BookItem from "../bookItem/BookItem";

const Books = ({ books, yearFiltered }) => {
  const booksMapped =
    yearFiltered === ""
      ? books.map((book) => (
          <BookItem
            key={book.id}
            title={book.title}
            author={book.author}
            amountPages={book.amountPages}
            date={book.date}
          />
        ))
      : books
          .filter(
            (book) => book.date.getFullYear().toString() === yearFiltered
          )
          .map((book) => (
            <BookItem
              key={book.id}
              title={book.title}
              author={book.author}
              amountPages={book.amountPages}
              date={book.date}
            />
          ));

  return (
    <div className="books">
      {booksMapped.length === 0 ? (
        <p>No hay lecturas disponibles para el año {yearFiltered}</p>
      ) : (
        booksMapped
      )}
    </div>
  );
};

export default Books;
