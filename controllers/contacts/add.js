const {Contact} = require('../../models');

const add = async (req, res, next) => {
  try {
    const body = {
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
