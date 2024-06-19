"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

const UploadBook = () => {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [pdf, setPdf] = useState(null);
  const [word, setWord] = useState(null);
  const [images, setImages] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('book_name', bookName);
    formData.append('author', author);
    formData.append('pdf', pdf);
    formData.append('word', word);
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await axios.post('http://localhost:3000/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      router('/');
    } catch (error) {
      console.error('Error uploading book', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Book Name:</label>
        <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} required />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div>
        <label>PDF:</label>
        <input type="file" onChange={(e) => setPdf(e.target.files[0])} required />
      </div>
      <div>
        <label>Word:</label>
        <input type="file" onChange={(e) => setWord(e.target.files[0])} required />
      </div>
      <div>
        <label>Images:</label>
        <input type="file" multiple onChange={(e) => setImages([...e.target.files])} required />
      </div>
      <button type="submit">Upload Book</button>
    </form>
  );
};

export default UploadBook;
