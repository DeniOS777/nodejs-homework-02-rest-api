const { NotFound } = require('http-errors');
const { User } = require('../../models');

const { sendConfirmEmail } = require('../../helpers');

const confirmSignup = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const user = await User.findOne({ verificationToken });

    if (!user)
      throw new NotFound('User not found or verificationToken is invalid');

    await User.findByIdAndUpdate(user._id, {
      verificationToken: 'empty',
      verify: true,
    });

    await sendConfirmEmail({
      to: 'denios777@gmail.com',
      subject: 'Thanks for your registration',
      html: '<h1>Thanks for your registration on our site.</h1>',
    });

    res.json({
      status: 'success',
      code: 200,
      message: 'Verification is successful',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = confirmSignup;
