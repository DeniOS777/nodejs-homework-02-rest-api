const express = require('express');

const {
  addContact,
  putUpdateContact,
  patchUpdateContact,
} = require('../../schemas');

const { validation } = require('../../middlewares');

const contactsOperations = require('../../models/contacts');

const router = express.Router();

router.get('/', async (_, res, next) => {
  try {
    const contacts = await contactsOperations.getContacts();
    res.json({
      message: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.status(200).json({
      message: 'success',
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', validation(addContact), async (req, res, next) => {
  try {
    const body = {
      favorite: false,
      ...req.body,
    };
    const contact = await contactsOperations.addContact(body);
    res.status(201).json({
      message: 'success',
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsOperations.removeContact(contactId);
    if (!contact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.json({
      status: 'success',
      message: 'contact deleted successfuly',
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:contactId',
  validation(putUpdateContact),
  async (req, res, next) => {
    const { contactId } = req.params;
    try {
      const contact = await contactsOperations.updateContact(
        contactId,
        req.body
      );
      if (!contact) {
        return res.status(404).json({
          message: 'Not found',
        });
      }
      res.status(200).json({
        message: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:contactId/favorite',
  validation(patchUpdateContact),
  async (req, res, next) => {
    const { contactId } = req.params;
    try {
      const contact = await contactsOperations.updateStatusContact(
        contactId,
        req.body
      );
      if (!contact) {
        return res.status(404).json({
          status: 'fail',
          code: 404,
          message: 'Not found',
        });
      }
      res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
