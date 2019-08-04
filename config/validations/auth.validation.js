const Joi = require('@hapi/joi');

module.exports = {
  // POST /v1/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string()
        .required()
        .max(128)
    }
  }
};
