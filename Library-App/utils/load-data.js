const fs = require("fs");

// Membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file users.json jika belum ada
const dataPath = "./data/users.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// Membuat file books.json jika belum ada
const booksPath = "./data/books.json";
if (!fs.existsSync(booksPath)) {
  fs.writeFileSync(booksPath, "[]", "utf-8");
}

// Ambil semua data user di file
const loadUsers = () => {
  const file = fs.readFileSync("data/users.json", "utf-8");
  const users = JSON.parse(file);
  return users;
};

// Menuliskan / menimpa file users.json dengan data yang baru
const saveUsers = (users) => {
  fs.writeFileSync("data/users.json", JSON.stringify(users));
};

// Ambil semua data buku di file
const loadBooks = () => {
  const file = fs.readFileSync("data/books.json", "utf-8");
  const books = JSON.parse(file);
  return books;
};

// Menuliskan / menimpa file books.json dengan data yang baru
const saveBooks = (books) => {
  fs.writeFileSync("data/books.json", JSON.stringify(books));
};

// Mencari buku berdasarkan id
const findBook = (id) => {
  const books = loadBooks();
  const book = books.find((book) => book.id === id);
  return book;
};

module.exports = { loadUsers, saveUsers, loadBooks, saveBooks, findBook };
