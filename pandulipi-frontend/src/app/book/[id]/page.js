"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BookDetail = ({params}) => {
  const router = useRouter();
  const id=params.id;
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (id) {
        console.log(id);
      const fetchBook = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/view/books/${id}`);
          setBook(response.data);
        } catch (error) {
          console.error('Error fetching book', error);
        }
      };
      fetchBook();
    }
  }, [id]);

  const handleShowPdf = () => {
    window.open(`../../../../${book.pdf}`, '_blank');
  };

  const handleShowWord = () => {
    window.open(`../../../../${book.word}`, '_blank');
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.book_name}</h1>
      <p>Author: {book.author}</p>
      <button onClick={handleShowPdf}>Show PDF</button>
      <button onClick={handleShowWord}>Show Word</button>
      <div>
        <h2>Images</h2>
        {book.images.map((image, index) => (
            
          <img key={index} src={`../../../../${image}`} alt={`Book Image ${index + 1}`} width="200" />
        ))}
      </div>
    </div>
  );
};

export default BookDetail;
