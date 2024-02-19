import React, { useState } from 'react';

function AddNewBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState('');
  const [reserved, setReserved] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !cover.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('https://65d1faa1987977636bfbc142.mockapi.io/api/react-test/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          cover,
          reserved,
        }),
      });

      if (response.ok) {
        setTitle('');
        setAuthor('');
        setCover('');
        setReserved(false);
        setError('');
        alert('Book added successfully!');
      } else {
        throw new Error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Add New Book</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cover" className="form-label">Cover URL</label>
          <input
            type="text"
            className="form-control"
            id="cover"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            required 
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="reserved"
            checked={reserved}
            onChange={(e) => setReserved(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="reserved">Reserved</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddNewBook;
