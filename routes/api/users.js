const express = require('express');

const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/signup', ctrl.signup);

module.exports = router;
