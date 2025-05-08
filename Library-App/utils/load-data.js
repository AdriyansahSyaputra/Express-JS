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

module.exports = { loadUsers, saveUsers };
