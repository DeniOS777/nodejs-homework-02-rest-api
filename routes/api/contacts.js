const express = require('express');

const { joiContactsSchema } = require('../../schemas');

const { validation, isValidId, validationToken } = require('../../middlewares');

const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.use(validationToken);

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validation(joiContactsSchema.add), ctrl.add);

router.delete('/:contactId', isValidId, ctrl.remove);

router.put(
  '/:contactId',
  isValidId,
  validation(joiContactsSchema.putUpdate),
  ctrl.putUpdate
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validation(joiContactsSchema.patchUpdate),
  ctrl.patchUpdate
);

module.exports = router;
