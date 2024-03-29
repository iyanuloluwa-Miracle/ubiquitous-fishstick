// validators/userValidator.js
const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  signupSchema,
  loginSchema,
};
