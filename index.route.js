const express = require('express');
const userRoutes = require('./server/user/user.route.js');
const authRoutes = require('./server/auth/auth.route.js');
const expenseRoutes = require('./server/expense/expense.route.js');

const router = express.Router();

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount expense routes at /users/:userid/expenses/
router.use('/users/:userId/expenses', expenseRoutes);
module.exports = router;
