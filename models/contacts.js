const Contact = require('./contact');

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async contactId => {
  return await Contact.findById(contactId);
};

// const removeContact = async contactId => {
//   try {
//     const contacts = await getAllContacts(contactsPath);
//     const index = contacts.findIndex(({ id }) => id === contactId);
//     if (index === -1) {
//       return null;
//     }
//     const removedContact = contacts[index];
//     contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts));
//     return removedContact;
//   } catch (error) {
//     console.log('Something went wrong, please try later...', error.message);
//   }
// };

// const addContact = async body => {
//   try {
//     const contacts = await getAllContacts(contactsPath);
//     const newContacts = [...contacts, body];
//     await fs.writeFile(contactsPath, JSON.stringify(newContacts));
//     return body;
//   } catch (error) {
//     console.log('Something went wrong, please try later...', error.message);
//   }
// };

// const updateContact = async (contactId, body) => {
//   try {
//     const contacts = await getAllContacts(contactsPath);
//     const [contactById] = contacts.filter(({ id }) => id === contactId);
//     if (!contactById) {
//       return null;
//     }
//     contactById.name = body.name;
//     contactById.email = body.email;
//     contactById.phone = body.phone;
//     await fs.writeFile(contactsPath, JSON.stringify(contacts));
//     return contactById;
//   } catch (error) {
//     console.log('Something went wrong, please try later...', error.message);
//   }
// };

module.exports = {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
};
