const { Unauthorized } = require('http-errors');
const { User } = require('../../models');

const confirmSignup = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = confirmSignup;
