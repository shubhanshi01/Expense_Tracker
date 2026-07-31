const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const validateExpense = require('../middleware/validateExpense');

/**
 * @openapi
 * /expenses:
 *   post:
 *     summary: Add a new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, amount, category, date]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Groceries
 *               amount:
 *                 type: number
 *                 example: 45.50
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 example: 2026-07-31
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Validation error
 */
router.post('/expenses', validateExpense, expenseController.createExpense);

/**
 * @openapi
 * /expenses/totals:
 *   get:
 *     summary: Calculate total expenses (overall or filtered by category)
 *     tags: [Expenses]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Optional category name to calculate total for that category
 *     responses:
 *       200:
 *         description: Summary of total expenses
 */
router.get('/expenses/totals', expenseController.getTotals);

/**
 * @openapi
 * /expenses/totals/category/{category}:
 *   get:
 *     summary: Calculate total expenses for a specific category
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Category name (e.g. Food, Transport)
 *     responses:
 *       200:
 *         description: Total amount and count for the specified category
 */
router.get('/expenses/totals/category/:category', expenseController.getCategoryTotal);

/**
 * @openapi
 * /expenses/category/{category}:
 *   get:
 *     summary: Filter expenses by specific category
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Category name to filter by
 *     responses:
 *       200:
 *         description: List of expenses in the specified category
 */
router.get('/expenses/category/:category', expenseController.getExpensesByCategory);

/**
 * @openapi
 * /expenses:
 *   get:
 *     summary: View all expenses (optionally filtered by category query)
 *     tags: [Expenses]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter expenses by category name
 *     responses:
 *       200:
 *         description: List of expenses
 */
router.get('/expenses', expenseController.getAllExpenses);

/**
 * @openapi
 * /expenses/{id}:
 *   get:
 *     summary: Get an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense details
 *       404:
 *         description: Expense not found
 */
router.get('/expenses/:id', expenseController.getExpenseById);

/**
 * @openapi
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 */
router.delete('/expenses/:id', expenseController.deleteExpense);

module.exports = router;
