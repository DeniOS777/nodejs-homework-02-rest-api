const Contact = require('../../models/contact');

const patchUpdate = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!contact) {
      return res.status(404).json({
        status: 'fail',
        code: 404,
        message: 'Not found',
      });
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = patchUpdate;
