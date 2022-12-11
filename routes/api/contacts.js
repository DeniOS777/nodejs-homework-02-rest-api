const express = require('express');

const { add, putUpdate, patchUpdate } = require('../../schemas');

const { validation, isValidId } = require('../../middlewares');

const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validation(add), ctrl.add);

router.delete('/:contactId', isValidId, ctrl.remove);

router.put('/:contactId', isValidId, validation(putUpdate), ctrl.putUpdate);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validation(patchUpdate),
  ctrl.patchUpdate
);

module.exports = router;
