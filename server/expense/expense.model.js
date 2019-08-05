const mongoose = require('mongoose');
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

module.exports = mongoose.model('expense', ExpenseSchema);
