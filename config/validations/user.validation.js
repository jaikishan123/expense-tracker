const Joi = require('@hapi/joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }, // Replace /api/users/:userId
  replaceUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    },
    params: {
      userId: Joi.string()
        .hex()
        .required()
    }
  }
};
