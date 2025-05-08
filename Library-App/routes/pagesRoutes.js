const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// Home routes
router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Auth Routes
router.get("/auth", (req, res) => {
  res.render("auth", {
    title: "Authentication",
    errors: req.flash("error"),
    message: req.flash("success"),
  });
});

router.post("/auth/register", register);
router.post("/auth/login", login);

module.exports = router;
