const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIErrors.js');

/**
 * Expense Schema
 */
const ExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.schema.Types.ObjectId,
    lowercase: true,
    required: true
  },
  coordinates: [Number],
  date: {
    type: Date,
    defaultValue: Date.now()
  },
  description: {
    type: String,
    lowercase: true
  },
  type: {
    type: String,
    enum: ['expense', 'income'],
    required: true
  },
  userId: {
    type: mongoose.schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

ExpenseSchema.statics = {
  /**
   * Get expense of a user
   * @param {ObjectId} userId - The objectId of the user.
   * @param {ObjectId} expenseId - The objectId of the expense.
   * @returns {Promise<User, APIError>}
   */
  get(userId, expenseId) {
    return this.findById(expenseId)
      .exec()
      .then(expense => {
        if (expense && expense.userId === userId) {
          return expense;
        }
        const err = new APIError(
          'No such expense exists!',
          httpStatus.NOT_FOUND
        );
        return Promise.reject(err);
      });
  }
};
module.exports = mongoose.model('expense', ExpenseSchema);
