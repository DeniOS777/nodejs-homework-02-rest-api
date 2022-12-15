const express = require('express');

const { contactsSchema } = require('../../schemas');

const { validation, isValidId } = require('../../middlewares');

const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validation(contactsSchema.add), ctrl.add);

router.delete('/:contactId', isValidId, ctrl.remove);

router.put(
  '/:contactId',
  isValidId,
  validation(contactsSchema.putUpdate),
  ctrl.putUpdate
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validation(contactsSchema.patchUpdate),
  ctrl.patchUpdate
);

module.exports = router;
