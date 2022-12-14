const { Conflict } = require('http-errors');
const { User } = require('../../models');

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict('Email in use');
    }

    const newUser = new User({ email });
    newUser.setPassword(password);
    newUser.save();

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email,
          subscription: 'starter' || req.body?.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
