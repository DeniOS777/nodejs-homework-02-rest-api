const express = require('express');

const router = express.Router();

const { validation } = require('../../middlewares');
const { joiAuthSchema } = require('../../schemas');

const { users: ctrl } = require('../../controllers');

router.post('/signup', validation(joiAuthSchema), ctrl.signup);

router.post('/login', validation(joiAuthSchema), ctrl.login);

module.exports = router;
