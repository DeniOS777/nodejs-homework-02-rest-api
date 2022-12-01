const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log("Something went wrong, please try later...", error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const [contactById] = contacts.filter(({ id }) => id === contactId);
    if (!contactById) {
      return null;
    }
    return contactById;
  } catch (error) {
    console.log("Something went wrong, please try later...", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      return null;
    }
    const removedContact = contacts[index];
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  } catch (error) {
    console.log("Something went wrong, please try later...", error.message);
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContacts = [...contacts, body];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return body;
  } catch (error) {
    console.log("Something went wrong, please try later...", error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const [contactById] = contacts.filter(({ id }) => id === contactId);
    if (!contactById) return null;
    contactById.name = body.name;
    contactById.email = body.email;
    contactById.phone = body.phone;
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contactById;
  } catch (error) {
    console.log("Something went wrong, please try later...", error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
