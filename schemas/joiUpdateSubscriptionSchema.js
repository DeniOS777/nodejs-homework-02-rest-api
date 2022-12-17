const Joi = require('joi');

const joiUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

module.exports = joiUpdateSubscriptionSchema;
