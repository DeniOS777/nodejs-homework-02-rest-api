const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const parseData = JSON.parse(data);
  return parseData;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const [contactById] = contacts.filter((contact) => contact.id === contactId);
  return contactById;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const newContacts = [...contacts, body];
  const payload = JSON.stringify(newContacts);
  await fs.writeFile(contactsPath, payload);
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
