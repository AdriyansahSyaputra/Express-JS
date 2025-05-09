const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { loadBooks, findBook } = require("../utils/load-data");

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
  res.render("index", { title: "Home", books });
});

// Edit book
router.get("/edit", (req, res) => {
  res.render("edit-book", { title: "Edit" });
});

// books
router.get("/books", (req, res) => {
  const books = loadBooks();
  res.render("books", { title: "Books", books });
});

// Detail book
router.get("/book/:title/:id", (req, res) => {
  const book = findBook(req.params.id);
  res.render("detail-book", { title: "Detail", book });
});

module.exports = router;
