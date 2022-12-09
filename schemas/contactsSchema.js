const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'uk', 'ca'] },
    })
    .required(),
  phone: Joi.string().min(6).required(),
  favorite: Joi.boolean().default(false),
});

module.exports = contactsSchema;
