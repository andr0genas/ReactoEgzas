import React, { useState, useEffect } from 'react';

function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://65d1faa1987977636bfbc142.mockapi.io/api/react-test/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const toggleReservation = async (bookId, newReservedStatus) => {
    try {
      const method = newReservedStatus ? 'PUT' : 'PATCH';
      await fetch(`https://65d1faa1987977636bfbc142.mockapi.io/api/react-test/books/${bookId}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reserved: newReservedStatus
        })
      });


      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId ? { ...book, reserved: newReservedStatus } : book
        )
      );
    } catch (error) {
      console.error('Error toggling reservation:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {books.map(book => (
          <div className="col-md-4" key={book.id}>
            <div className="card mb-4">
              <img className="card-img-top" src={book.cover} alt={book.title} />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <button
                  className={`btn ${book.reserved ? 'btn-danger' : 'btn-success'}`}
                  onClick={() => toggleReservation(book.id, !book.reserved)}
                >
                  {book.reserved ? 'Grąžinti' : 'Išduoti skaitytojui'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
