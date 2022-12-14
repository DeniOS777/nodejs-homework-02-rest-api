const express = require('express');
const { User } = require('../../models');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(409).json({
        status: 'conflict',
        code: 409,
        message: 'Email in use',
      });
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
          subscription: 'starter',
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
