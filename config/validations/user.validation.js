const Joi = require('@hapi/joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }, // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string(),
      password: Joi.string()
    },
    params: {
      userId: Joi.string()
        .hex()
        .required()
    }
  }
};
