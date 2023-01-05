const { BadRequest, NotFound } = require('http-errors');

const { User } = require('../../models');

const { sendConfirmEmail } = require('../../helpers');

const resendVerificationToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) throw new NotFound(`User with ${email} was not found`);

    if (user.verify)
      throw new BadRequest('Verification has already been passed');

    await sendConfirmEmail({
      to: 'denios777@gmail.com',
      subject: 'Resend a verification email',
      html: `Click <a href='http://localhost:3001/api/users/verify/${user.verificationToken}'>сonfirm email</a> for verify your registration`,
    });

    res.json({
      status: 'success',
      code: 200,
      message: 'Verification email sent',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerificationToken;
