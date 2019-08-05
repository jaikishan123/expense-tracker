const _ = require('lodash');
const Expense = require('./expense.model');
/**
 * Load expense of a user and append to req.
 */
function load(req, res, next, expenseId) {
  Expense.get(req.params.userId, expenseId)
    .then(expense => {
      req.expense = expense;
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get expense of a user
 * @returns {Expense}
 */
function getOne(req, res) {
  return res.json(req.expense);
}

/**
 * Replace existing expense
 * @property {string} req.body.amaount - The amount of the expense.
 * @property {string} req.body.category - The category of the expense.
 * @property {string} req.body.type - The type of the expense.
 * @returns {Expense}
 */
function replace(req, res, next) {
  const { expense } = req;
  const update = req.body;
  update.userId = req.params.userId;

  _.merge(expense, update);

  expense
    .save()
    .then(savedExpense => res.json(savedExpense))
    .catch(e => next(e));
}

function remove(req, res, next) {
  const { expense } = req;

  expense
    .remove()
    .then(deletedExpense => res.json(deletedExpense))
    .catch(e => next(e));
}

module.exports = { load, getOne, replace, remove };
