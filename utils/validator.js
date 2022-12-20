const Joi = require("joi");

const taskSchema = {
  name: Joi.string().min(3).required(),
  completed: Joi.boolean().required(),
};

exports.validateTask = (task) => Joi.validate(task, taskSchema);
