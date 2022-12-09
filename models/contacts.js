const Contact = require('./contact');

const getContacts = async () => {
  return await Contact.find();
};

const getContactById = async contactId => {
  return await Contact.findById(contactId);
};

const addContact = async body => {
  return await Contact.create(body);
};

const removeContact = async contactId => {
  return await Contact.findByIdAndDelete(contactId);
};

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

// const updateStatusContact = (contactId, body) => {}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  // updateContact,
  // updateStatusContact,
};
