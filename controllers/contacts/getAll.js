const contactsOperations = require('../../models/contacts');

const getAll = async (_, res, next) => {
  try {
    const contacts = await contactsOperations.getContacts();
    res.json({
      message: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
