const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../../models');

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.checkPassword(password)) {
      throw new Unauthorized('Email or password is wrong');
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY);
    res.json({
      status: 'success',
      code: 200,
      data: {
        token,
        user: {
          email,
          subscription: req.body?.subscription || 'starter',
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
