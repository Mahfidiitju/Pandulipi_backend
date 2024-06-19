"use client"
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/view/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link href={`/book/${book.id}`}>{book.book_name}</Link> by {book.author}
          </li>
        ))}
      </ul>
      <Link href="/upload">Upload a new book</Link>
    </div>
  );
};

export default BookList;
