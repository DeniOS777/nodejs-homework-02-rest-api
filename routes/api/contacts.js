const express = require('express');

const { add, putUpdate, patchUpdate } = require('../../schemas');

const { validation } = require('../../middlewares');

const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validation(add), ctrl.add);

router.delete('/:contactId', ctrl.remove);

router.put('/:contactId', validation(putUpdate), ctrl.putUpdate);

router.patch('/:contactId/favorite', validation(patchUpdate), ctrl.patchUpdate);

module.exports = router;
