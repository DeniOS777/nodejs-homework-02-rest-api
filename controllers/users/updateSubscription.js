const { User } = require('../../models');

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  try {
    await User.findByIdAndUpdate(_id, { subscription }, { new: true });

    res.json({
      status: 'success',
      code: 200,
      message: `Your current subscription is ${subscription}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
