const gravatar = require('gravatar');
const { v4 } = require('uuid');
const { Conflict } = require('http-errors');

const { User } = require('../../models');

const signup = async (req, res, next) => {
  const { email, password, subscription } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict('Email in use');
    }
    const avatarURL = gravatar.url(email);

    const newUser = new User({ email, subscription, avatarURL });
    newUser.setPassword(password);
    newUser.save();

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email,
          subscription: subscription || 'starter',
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
