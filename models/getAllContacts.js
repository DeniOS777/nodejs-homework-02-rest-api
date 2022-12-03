const fs = require("fs/promises");

const getAllContacts = async (contactsPath) => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log("Not found contacts", error.message);
  }
};

module.exports = getAllContacts;
