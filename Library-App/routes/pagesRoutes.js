const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { loadBooks, findBook } = require("../utils/load-data");
const { addBook, updateBook, deleteBook } = require("../controllers/bookController");
const upload = require("../middlewares/upload");

// Auth Routes
router.get("/auth", (req, res) => {
  res.render("auth", {
    title: "Authentication",
    errors: null,
    message: req.flash("success"),
    old: req.body,
  });
});

router.post("/auth/register", register);
router.post("/auth/login", login);

// Home routes
router.get("/", (req, res) => {
  const books = loadBooks();

  books.forEach((book) => {
    if (book.cover.startsWith("cover")) {
      book.coverPath = "/uploads/" + book.cover;
    } else {
      book.coverPath = "/img/cover/" + book.cover;
    }
  });

  res.render("index", { title: "Home", books });
});

// Edit book
router.get("/book/edit/:id", (req, res) => {
  const book = findBook(req.params.id);

  const imagePath = book.cover.startsWith("cover")
    ? "/uploads/" + book.cover
    : "/img/cover/" + book.cover;

  res.render("edit-book", { title: "Edit", book, imagePath });
});

router.post("/book/update/:id", upload.single("cover") , (req, res) => {
  // tampilkan debug hasil di json
  console.log(req.body);

  updateBook(req, res);
});

// books
router.get("/books", (req, res) => {
  const books = loadBooks();
  res.render("books", { title: "Books", books });
});

// Form add book
router.get("/add-book", (req, res) => {
  res.render("add-book", { title: "Add Book" });
});

router.post("/add-book", upload.single("cover"), addBook);

// Route delete book
router.get("/book/delete/:id", (req, res) => {
  deleteBook(req.params.id);
  res.redirect("/books");
});

// Detail book
router.get("/book/:title/:id", (req, res) => {
  const book = findBook(req.params.id);

  const imagePath = book.cover.startsWith("cover")
    ? "/uploads/" + book.cover
    : "/img/cover/" + book.cover;

  res.render("detail-book", { title: "Detail", book, imagePath });
});

module.exports = router;
