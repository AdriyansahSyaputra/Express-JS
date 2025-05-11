const { nanoid } = require("nanoid");
const { loadBooks, saveBooks, findBook } = require("../utils/load-data");
const fs = require("fs");
const path = require("path");

// Fungsi untuk menambahkan buku
const addBook = (req, res) => {
  const books = loadBooks();
  const id = nanoid(16);

  const newBook = {
    id: id,
    title: req.body.title,
    author: req.body.author,
    year: parseInt(req.body.year),
    publisher: req.body.publisher || "-",
    pages: parseInt(req.body.pages) || 0,
    language: req.body.language || "Indonesia",
    format: req.body.format || "Hardcover",
    description: req.body.description,
    category: Array.isArray(req.body.category)
      ? req.body.category
      : [req.body.category],
    status: "tersedia",
    cover: req.file ? req.file.filename : null,
  };

  books.push(newBook);
  saveBooks(books);
  res.redirect("/books");
};

// Fungsi untuk update buku
const updateBook = (req, res) => {
  const books = loadBooks();
  const {
    title,
    author,
    year,
    publisher,
    pages,
    status,
    category,
    language,
    format,
    description,
  } = req.body;

  const id = req.params.id;

  const index = books.findIndex((book) => book.id === id);

  // Debugging
  console.log("Updating book with ID:", id);
  console.log("Request body:", req.body);

  if (index === -1) {
    res.status(404).send("Buku tidak ditemukan");
  }

  // Hapus cover lama jika ada file baru
  if (req.file) {
    const oldCover = books[index].cover;
    if (oldCover) {
      const oldCoverPath = path.join(__dirname, "../public/uploads", oldCover);
      if (fs.existsSync(oldCoverPath)) {
        fs.unlinkSync(oldCoverPath);
      }
    }
    books[index].cover = req.file.filename;
  }

  // Update data buku
  books[index] = {
    ...books[index],
    title,
    author,
    year,
    publisher,
    pages,
    status,
    category,
    language,
    format,
    description,
  };

  saveBooks(books);
  res.redirect("/books");
};

// Fungsi untuk menghapus buku
const deleteBook = (id) => {
  const books = loadBooks();
  const index = books.findIndex((book) => book.id === id);

  // Hapus cover lama
  if (index !== -1) {
    const oldCover = books[index].cover;
    if (oldCover) {
      const oldCoverPath = path.join(__dirname, "../public/uploads", oldCover);
      if (fs.existsSync(oldCoverPath)) {
        fs.unlinkSync(oldCoverPath);
      }
    }
    books.splice(index, 1);
    saveBooks(books);
  }
};

module.exports = { addBook, updateBook, deleteBook };
