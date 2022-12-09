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

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
};

// const updateStatusContact = (contactId, body) => {}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  // updateStatusContact,
};
