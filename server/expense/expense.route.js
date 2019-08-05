const express = require('express');
const validate = require('express-validation');
const expenseCtrl = require('./expense.controller.js');
const validation = require('../../config/validations/expense.validation.js');
const authenticate = require('../middlewares/authenticate.js');

const router = express.Router();

/**
 * Load expense for a user when API with userId and expenseId route parameter is hit
 */
router.param('expenseId', expenseCtrl.load);

router
  .route('/')
  /** GET /api/users/:userId/expenses/ - Get list of expenses of a user */
  .get(authenticate.authenticateUser, expenseCtrl.get)
  /** POST /api/users/:userId/expenses - Create new expense for a user */
  .post(
    authenticate.authenticateUser,
    validate(validation.createExpense),
    expenseCtrl.post
  );

router
  .route('/:expenseId')
  /** GET /api/users/:userId/expenses/:expenseId - Get expense of a user */
  .get(authenticate.authenticateUser, expenseCtrl.getOne)

  /** PUT /api/users/:userId/expenses/:expenseId - Replace expense of the user */
  .put(
    authenticate.authenticateUser,
    validate(validation.replaceExpense),
    expenseCtrl.replace
  )

  /** DELETE /api/users/:userId/expenses/:expenseId - Delete expense of a user */
  .delete(authenticate.authenticateUser, expenseCtrl.remove);
module.exports = router;
