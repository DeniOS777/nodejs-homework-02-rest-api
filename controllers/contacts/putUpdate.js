// const contactsOperations = require('../../models/contacts');
const Contact = require('../../models/contact');

const putUpdate = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!contact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }

    res.status(200).json({
      message: 'success',
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = putUpdate;
