const express = require('express');
const path = require('path');
const multer = require('multer');

const router = express.Router();

const tempDir = path.join(__dirname, '../../', 'temp');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 2097152,
  },
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers['content-length']);

    if (fileSize > 2097152) {
      const error = new Error();
      error.status = 400;
      error.message = 'The file must be no more than 2Mb';
      return cb(error);
    }
    cb(null, true);
  },
});

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

router.patch(
  '/avatars',
  validationToken,
  upload.single('avatar'),
  ctrl.updateAvatar
);

module.exports = router;
