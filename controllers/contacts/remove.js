const { Contact } = require('../../models');

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }

    res.json({
      status: 'success',
      message: 'contact deleted successfuly',
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
