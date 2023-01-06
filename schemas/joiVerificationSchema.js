const Joi = require('joi');

const joiVerificationSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org'] },
    })
    .required(),
});

module.exports = joiVerificationSchema;