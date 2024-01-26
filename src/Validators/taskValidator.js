// validators/taskValidator.js
const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string().valid('pending', 'completed').default('pending'),
});

const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid('pending', 'completed'),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
