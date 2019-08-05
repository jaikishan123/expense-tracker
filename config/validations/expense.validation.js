const Joi = require('@hapi/joi');

module.exports = {
  // POST /api/users/:userId/expenses/:expenseId
  replaceExpense: {
    body: {
      userId: Joi.string().required(),
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
  }
};
