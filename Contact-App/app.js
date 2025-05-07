const express = require("express");
const app = express();
const {
  loadContact,
  findContact,
  addContact,
  checkDuplicate,
  deleteContact,
  updateContacts,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

// Set view engine
app.set("view engine", "ejs");

// set directory public
app.use(express.static("public"));

// set body parser
app.use(express.urlencoded({ extended: true }));

// Configuration flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", { title: "Contact", contacts, msg: req.flash("msg") });
});

app.get("/contact/add", (req, res) => {
  res.render("add-contact", { title: "Add Contact" });
});

app.post(
  "/contact",
  [
    body("name").custom((value) => {
      const duplicate = checkDuplicate(value);
      if (duplicate) {
        throw new Error("Contact name already used!");
      }
      return true;
    }),

    check("email", "Email is not valid").isEmail(),
    check("phone", "Phone number is not valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Add Contact",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);

      // Kirimkan flash messages
      req.flash("msg", "Contact added successfully!");

      res.redirect("/contact");
    }
  }
);

// Proses delete contact
app.get("/contact/delete/:id", (req, res) => {
  const contact = findContact(req.params.id);

  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.id);
    req.flash("msg", "Contact deleted successfully!");
    res.redirect("/contact");
  }
});

// Page edit contact
app.get("/contact/edit/:id", (req, res) => {
  const contact = findContact(req.params.id);
  res.render("edit-contact", {
    title: "Edit Contact",
    contact,
  });
});

// Proses update contact
app.post(
  "/contact/update",
  [
    body("name").custom((value, { req }) => {
      const duplicate = checkDuplicate(value);
      if (value !== req.body.oldName && duplicate) {
        throw new Error("Contact name already used!");
      }
      return true;
    }),

    check("email", "Email is not valid").isEmail(),
    check("phone", "Phone number is not valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Edit Contact",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContacts(req.body);
      req.flash("msg", "Contact updated successfully!");
      res.redirect("/contact");
    }
  }
);

app.get("/contact/:id", (req, res) => {
  const contact = findContact(req.params.id);
  res.render("detail", {
    title: "Contact Detail",
    contact,
  });
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
