const signup = require('./signup');
const confirmSignup = require('./confirmSignup');
const resendVerificationToken = require('./resendVerificationToken');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');

module.exports = {
  signup,
  confirmSignup,
  resendVerificationToken,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
};
