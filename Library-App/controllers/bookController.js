const { nanoid } = require("nanoid");
const { loadBooks, saveBooks, findBook } = require("../utils/load-data");

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

module.exports = { addBook };
