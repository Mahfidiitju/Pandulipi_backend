const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const Book = require('./model/book');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pandulipi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

// POST route to add a new book
app.post('/books', upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'word', maxCount: 1 }, { name: 'images', maxCount: 10 }]), async (req, res) => {
  try {
    const { book_name, author } = req.body;
    const pdf = req.files.pdf ? req.files.pdf[0].path : null;
    const word = req.files.word ? req.files.word[0].path : null;
    const images = req.files.images ? req.files.images.map(file => file.path) : [];

    if (!book_name || !author || !pdf || !word || images.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newBook = new Book({
      book_name,
      author,
      pdf,
      word,
      images
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error saving book', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to retrieve all books
app.get('/view/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const books = await Book.findById(req.params.id);
    res.status(200).json(books);
  } catch (error) {
    console.error('Error retrieving books', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/view/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      console.error('Error retrieving books', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// app.get('view/book/:id', async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   try {
//     const books = await Book.findById(id);
//     console.log(books);
//     if (!books) {
//       return res.status(404).json({ message: 'Book not found' });
//     }
//     res.status(200).json(books);
//   } catch (error) {
//     console.error('Error retrieving book by ID', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Start the server
const PORT =3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
