const express = require('express');

const router = express.Router();

const { validation, validationToken } = require('../../middlewares');
const { joiAuthSchema, joiUpdateSubscriptionSchema } = require('../../schemas');

const { users: ctrl } = require('../../controllers');

router.post('/signup', validation(joiAuthSchema), ctrl.signup);

router.post('/login', validation(joiAuthSchema), ctrl.login);

router.get('/logout', validationToken, ctrl.logout);

router.get('/current', validationToken, ctrl.current);

router.patch(
  '/',
  validationToken,
  validation(joiUpdateSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
