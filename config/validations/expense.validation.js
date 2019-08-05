const Joi = require('@hapi/joi');

module.exports = {
  // POST /api/users/:userId/expenses/:expenseId
  replaceExpense: {
    body: {
      amount: Joi.string().required(),
      category: Joi.string().required(),
      type: Joi.string().required()
    },
    params: {
      userId: Joi.string()
        .hex()
        .required(),
      expenseId: Joi.string()
        .hex()
        .required()
    }
  },
  createExpense: {
    body: {
      userId: Joi.string()
        .hex()
        .valid(Joi.ref('$params.userId'))
        .required(),
      amount: Joi.string().required(),
      category: Joi.string().required(),
      type: Joi.string().required()
    },
    params: {
      userId: Joi.string()
        .hex()
        .required()
    }
  }
};
