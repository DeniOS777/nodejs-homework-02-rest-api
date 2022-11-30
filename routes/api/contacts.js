const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const contactsOperations = require("../../models/contacts");

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
    res.json({
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
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "missing required name field",
      });
    }
    const contact = {
      id: uuidv4(),
      ...req.body,
    };
    await contactsOperations.addContact(contact);
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
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "missing fields",
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
