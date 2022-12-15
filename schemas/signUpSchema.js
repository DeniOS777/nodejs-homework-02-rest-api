const Joi = require('joi');

const joiSignUpSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org'] },
    })
    .required(),
  password: Joi.string().min(6).max(16).required(),
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .default('starter'),
});

module.exports = joiSignUpSchema;
