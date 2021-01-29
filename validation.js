const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required(),
  });

  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
