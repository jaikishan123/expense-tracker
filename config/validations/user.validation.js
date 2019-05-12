const Joi = require('@hapi/joi');

module.exports = {
  // GET /v1/users
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
