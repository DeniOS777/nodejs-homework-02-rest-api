const Joi = require('joi');

const add = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'uk', 'ca'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/, 'numbers')
    .required(),
  favorite: Joi.boolean().default(false),
});

const putUpdate = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'uk', 'ca'] },
    })
    .required(),
  phone: Joi.string().min(6).required(),
  favorite: Joi.boolean().required(),
});

const patchUpdate = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  add,
  putUpdate,
  patchUpdate,
};
