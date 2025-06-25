const express = require('express');
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats
} = require('../controllers/expenseController');

const router = express.Router();

// Routes
router.route('/')
  .get(getExpenses)
  .post(createExpense);

router.route('/stats')
  .get(getExpenseStats);

router.route('/:id')
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;