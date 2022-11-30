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
    if (!contactById) {
      return null;
    }
    return contactById;
  } catch (error) {
    console.log("Not found");
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const removedContact = contacts[index];
    contacts.splice(index, 1);
    const payload = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, payload);
    return removedContact;
  } catch (error) {
    console.log("Not found");
  }
};

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

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const [contactById] = contacts.filter((contact) => contact.id === contactId);
  contactById.name = body.name;
  contactById.email = body.email;
  contactById.phone = body.phone;
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contactById;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
