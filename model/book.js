// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  book_name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  pdf: {
    type: String,
    required: true
  },
  word: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Book', bookSchema);
