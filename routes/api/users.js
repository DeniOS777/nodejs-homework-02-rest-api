const express = require('express');

const router = express.Router();

const { validation } = require('../../middlewares');
const { joiSignUpSchema } = require('../../schemas');

const { users: ctrl } = require('../../controllers');

router.post('/signup', validation(joiSignUpSchema), ctrl.signup);

module.exports = router;
