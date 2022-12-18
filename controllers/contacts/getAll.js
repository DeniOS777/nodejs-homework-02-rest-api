const { Contact } = require('../../models');

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  try {
    const contacts = await Contact.find(
      { owner: _id, favorite: { $in: favorite ?? [true, false] } },
      null,
      {
        skip,
        limit: Number(limit),
      }
    ).populate('owner', '_id email');

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
