const expenseService = require('../services/expenseService');

const createExpense = (req, res, next) => {
  try {
    const { title, amount, category, date } = req.body;
    const expense = expenseService.createExpense({ title, amount, category, date });
    return res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

const getAllExpenses = (req, res, next) => {
  try {
    const { category } = req.query;
    const expenses = expenseService.getAllExpenses(category);
    return res.status(200).json(expenses);
  } catch (err) {
    next(err);
  }
};

const getExpenseById = (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = expenseService.getExpenseById(id);
    if (!expense) {
      return res.status(404).json({ error: `Expense with ID '${id}' not found.` });
    }
    return res.status(200).json(expense);
  } catch (err) {
    next(err);
  }
};

const getTotals = (req, res, next) => {
  try {
    const totals = expenseService.getTotals();
    return res.status(200).json(totals);
  } catch (err) {
    next(err);
  }
};

const deleteExpense = (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = expenseService.deleteExpense(id);
    if (!deleted) {
      return res.status(404).json({ error: `Expense with ID '${id}' not found.` });
    }
    return res.status(200).json({ message: `Expense with ID '${id}' deleted successfully.` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  getTotals,
  deleteExpense,
};
