const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

// Set view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
