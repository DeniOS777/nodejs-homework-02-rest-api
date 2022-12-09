const express = require('express');

const {
  addContact,
  putUpdateContact,
  patchUpdateContact,
} = require('../../schemas');

const { validation } = require('../../middlewares');

const { contacts: ctrl } = require('../../controllers/');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validation(addContact), ctrl.add);

router.delete('/:contactId', ctrl.remove);

router.put('/:contactId', validation(putUpdateContact), ctrl.putUpdate);

router.patch(
  '/:contactId/favorite',
  validation(patchUpdateContact),
  ctrl.patchUpdate
);

module.exports = router;
