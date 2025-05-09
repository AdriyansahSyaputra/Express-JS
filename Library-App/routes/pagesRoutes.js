const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

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
  res.render("index", { title: "Home" });
});

// Edit book
router.get("/edit", (req, res) => {
  res.render("edit-book", { title: "Edit" });
});

// books
router.get("/books", (req, res) => {
  res.render("books", { title: "Books" });
})

// Detail book
router.get("/detail", (req, res) => {
  res.render("detail-book", { title: "Detail" });
});

module.exports = router;
