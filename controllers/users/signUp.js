const gravatar = require('gravatar');
const { v4 } = require('uuid');
const { Conflict } = require('http-errors');

const { User } = require('../../models');

const { sendConfirmEmail } = require('../../helpers');

const signup = async (req, res, next) => {
  const { email, password, subscription } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict('Email in use');
    }
    const avatarURL = gravatar.url(email);

    const verificationToken = v4();

    const newUser = new User({
      email,
      subscription,
      avatarURL,
      verificationToken,
    });
    newUser.setPassword(password);
    newUser.save();

    await sendConfirmEmail({
      to: 'denios777@gmail.com',
      subject: 'Please confirm your email',
      html: `Click <a href='http://localhost:3001/api/users/verify/${verificationToken}'>сonfirm email</a> for verify your registration`,
    });

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
