const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    return parseData;
  } catch (error) {
    console.log("Not found");
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const [contactById] = contacts.filter((contact) => contact.id === contactId);
    return contactById;
  } catch (error) {
    console.log("Not found");
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContacts = [...contacts, body];
    const payload = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, payload);
  } catch (error) {
    console.log("Not found");
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
