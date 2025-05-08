const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const { loadUsers, saveUsers } = require("../utils/load-data");

// Register
const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const users = loadUsers();

  const errors = {};

  // Cek firstname dan lastname apakah sudah ada atau belum
  const duplicate = users.find(
    (user) => user.firstname === firstname && user.lastname === lastname
  );
  if (duplicate) {
    errors.firstname = "First name and last name already used!";
  }

  // Cek email
  const duplicateEmail = users.find((user) => user.email === email);
  if (duplicateEmail) {
    errors.email = "Email already used!";
  }

  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: nanoid(16),
    firstname,
    lastname,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  saveUsers(users);
  req.flash("success", "Register successful!");
  res.redirect("/auth");
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();

  // Check credentials
  const user = users.find((user) => user.email === email);
  if (!user) {
    res.status(400).json({ message: "Invalid credentials!" });
    res.redirect("/auth");
    return;
  }

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(400).json({ message: "Invalid credentials!" });
    res.redirect("/auth");
    return;
  }

  saveUsers(users);

  res.redirect("/");
};

module.exports = { register, login };
