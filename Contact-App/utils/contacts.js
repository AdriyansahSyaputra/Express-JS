const { name } = require("ejs");
const fs = require("fs");
const { nanoid } = require("nanoid");

// Membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// Ambil semua data contact di file
const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// cari contact berdasarkan id
const findContact = (id) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.id === id);
  return contact;
};

// Menuliskan / menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// Menambahkan data contact baru
const addContact = (contact) => {
  const contacts = loadContact();
  const id = nanoid(16);

  const newContact = { id, ...contact };
  contacts.push(newContact);
  saveContacts(contacts);
};

// Check Duplicate Name
const checkDuplicate = (name) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.name === name);
};

// Delete contact
const deleteContact = (id) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.id !== id);
  saveContacts(filteredContacts);
};

// Mengubah contacts
const updateContacts = (newContact) => {
  const contacts = loadContact();

  // Temukan kontak lama berdasarkan ID atau nama (jika ID tidak ada di newContact)
  const existingContact = contacts.find(
    (contact) =>
      contact.id === newContact.id || contact.name === newContact.oldName
  );

  // Jika kontak ditemukan, gunakan ID yang sama
  if (existingContact) {
    newContact.id = existingContact.id;
  } else {
    // Jika tidak ditemukan, buat ID baru (untuk case baru)
    newContact.id = nanoid(16);
  }

  // Hapus properti oldName jika ada
  if (newContact.oldName) {
    delete newContact.oldName;
  }

  // Filter kontak lama (berdasarkan ID atau nama lama)
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.id !== newContact.id &&
      (!newContact.oldName || contact.name !== newContact.oldName)
  );

  // Tambahkan kontak baru/update
  filteredContacts.push(newContact);
  saveContacts(filteredContacts);
};
module.exports = {
  loadContact,
  findContact,
  addContact,
  checkDuplicate,
  deleteContact,
  updateContacts,
};
