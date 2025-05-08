const express = require("express");
const path = require("path");
const app = express();
const pagesRoutes = require("./routes/pagesRoutes");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware bawaan express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file
app.use(express.static(path.join(__dirname, "public")));

// Configuration flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Routes
app.use("/", pagesRoutes);

// simple error handling
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Server running
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
