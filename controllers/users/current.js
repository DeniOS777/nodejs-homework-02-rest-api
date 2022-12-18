const { Unauthorized } = require('http-errors');

const current = async (req, res, next) => {
  const user = req.user;
  try {
    if (!user) {
      throw new Unauthorized('Not authorized');
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = current;
