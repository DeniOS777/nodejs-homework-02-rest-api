const { Unauthorized } = require('http-errors');

const { User } = require('../../models');

const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new Unauthorized('Not authorized');
    }
    user.clearToken();
    user.save();
    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
