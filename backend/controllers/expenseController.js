const Expense = require('../models/expenseModel');

// In-memory storage for demo purposes when database is not available
let expenses = [
  {
    id: '1',
    amount: 25.50,
    category: 'Food',
    description: 'Lunch at restaurant',
    date: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    amount: 60.00,
    category: 'Transportation',
    description: 'Gas for car',
    date: new Date('2024-01-14'),
    createdAt: new Date('2024-01-14')
  },
  {
    id: '3',
    amount: 120.00,
    category: 'Shopping',
    description: 'Groceries',
    date: new Date('2024-01-13'),
    createdAt: new Date('2024-01-13')
  }
];

// Get all expenses
const getExpenses = async (req, res) => {
  try {
    // Try database first, fallback to in-memory
    if (require('mongoose').connection.readyState === 1) {
      const expenses = await Expense.find({}).sort({ date: -1 });
      res.json(expenses);
    } else {
      res.json(expenses);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new expense
const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    if (!amount || !category || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Try database first, fallback to in-memory
    if (require('mongoose').connection.readyState === 1) {
      const expense = new Expense({
        amount: parseFloat(amount),
        category,
        description,
        date: date ? new Date(date) : new Date()
      });

      const savedExpense = await expense.save();
      res.status(201).json(savedExpense);
    } else {
      const newExpense = {
        id: (expenses.length + 1).toString(),
        amount: parseFloat(amount),
        category,
        description,
        date: date ? new Date(date) : new Date(),
        createdAt: new Date()
      };
      expenses.push(newExpense);
      res.status(201).json(newExpense);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, description, date } = req.body;

    // Try database first, fallback to in-memory
    if (require('mongoose').connection.readyState === 1) {
      const expense = await Expense.findByIdAndUpdate(
        id,
        {
          amount: parseFloat(amount),
          category,
          description,
          date: date ? new Date(date) : new Date()
        },
        { new: true, runValidators: true }
      );

      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      res.json(expense);
    } else {
      const expenseIndex = expenses.findIndex(exp => exp.id === id);
      if (expenseIndex === -1) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      expenses[expenseIndex] = {
        ...expenses[expenseIndex],
        amount: parseFloat(amount),
        category,
        description,
        date: date ? new Date(date) : new Date()
      };

      res.json(expenses[expenseIndex]);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Try database first, fallback to in-memory
    if (require('mongoose').connection.readyState === 1) {
      const expense = await Expense.findByIdAndDelete(id);
      
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      res.json({ message: 'Expense deleted successfully' });
    } else {
      const expenseIndex = expenses.findIndex(exp => exp.id === id);
      if (expenseIndex === -1) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      expenses.splice(expenseIndex, 1);
      res.json({ message: 'Expense deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get expense statistics
const getExpenseStats = async (req, res) => {
  try {
    let expenseData = expenses;

    // Try database first, fallback to in-memory
    if (require('mongoose').connection.readyState === 1) {
      expenseData = await Expense.find({});
    }

    // Calculate category totals
    const categoryTotals = expenseData.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    // Calculate monthly totals
    const monthlyTotals = expenseData.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      acc[month] = (acc[month] || 0) + expense.amount;
      return acc;
    }, {});

    const totalExpenses = expenseData.reduce((sum, expense) => sum + expense.amount, 0);

    res.json({
      categoryTotals,
      monthlyTotals,
      totalExpenses,
      expenseCount: expenseData.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats
};