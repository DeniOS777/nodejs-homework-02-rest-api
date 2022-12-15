const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models');

const { SECRET_KEY } = process.env;

const validationToken = async (req, _, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new Unauthorized('Not authorized');
    }
    const [, token] = authorization.split(' ');

    jwt.verify(token, SECRET_KEY, function (err) {
      if (err) throw new Unauthorized('Not authorized');
    });

    const { id } = jwt.decode(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || token !== user.token) {
      throw new Unauthorized('Not authorized');
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validationToken;
