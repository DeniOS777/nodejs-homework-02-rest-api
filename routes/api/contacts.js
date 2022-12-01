const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const router = express.Router();

const contactsOperations = require("../../models/contacts");

const validationSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(6).required(),
});

router.get("/", async (_, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      message: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json({
      message: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const body = {
      id: uuidv4(),
      ...req.body,
    };
    const contact = await contactsOperations.addContact(body);
    res.status(201).json({
      message: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const contact = await contactsOperations.updateContact(contactId, req.body);
    if (!contact) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json({
      message: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
