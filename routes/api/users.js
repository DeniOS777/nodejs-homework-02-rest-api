const express = require('express');

const router = express.Router();

const { uploadAvatars: upload } = require('../../helpers');

const { validation, validationToken } = require('../../middlewares');
const {
  joiAuthSchema,
  joiUpdateSubscriptionSchema,
  joiVerificationSchema,
} = require('../../schemas');

const { users: ctrl } = require('../../controllers');

router.post('/signup', validation(joiAuthSchema), ctrl.signup);

router.get('/verify/:verificationToken', ctrl.confirmSignup);

router.post(
  '/verify',
  validation(joiVerificationSchema),
  ctrl.resendVerificationToken
);

router.post('/login', validation(joiAuthSchema), ctrl.login);

router.get('/logout', validationToken, ctrl.logout);

router.get('/current', validationToken, ctrl.current);

router.patch(
  '/',
  validationToken,
  validation(joiUpdateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  '/avatars',
  validationToken,
  upload.single('avatar'),
  ctrl.updateAvatar
);

module.exports = router;
