const { Contact } = require('../../models');

const add = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const body = {
      owner: _id,
      favorite: false,
      ...req.body,
    };

    const contact = await Contact.create(body);
    res.status(201).json({
      message: 'success',
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
