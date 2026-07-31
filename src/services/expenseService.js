const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class ExpenseService {
  constructor(filePath = path.join(__dirname, '../data/expenses.json')) {
    this.filePath = filePath;
    this.expenses = [];
    this.load();
  }

  load() {
    if (process.env.NODE_ENV === 'test') {
      this.expenses = [];
      return;
    }
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf8');
        this.expenses = JSON.parse(data || '[]');
      } else {
        this.expenses = [];
        this.save();
      }
    } catch (err) {
      console.error('Error loading expenses file:', err.message);
      this.expenses = [];
    }
  }

  save() {
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(this.expenses, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving expenses file:', err.message);
    }
  }

  createExpense({ title, amount, category, date }) {
    const newExpense = {
      id: uuidv4(),
      title: title.trim(),
      amount: Number(amount.toFixed(2)),
      category: category.trim(),
      date: new Date(date).toISOString().split('T')[0],
    };

    this.expenses.push(newExpense);
    this.save();
    return newExpense;
  }

  getAllExpenses(categoryFilter) {
    if (!categoryFilter) {
      return [...this.expenses];
    }
    const filterLower = categoryFilter.trim().toLowerCase();
    return this.expenses.filter(
      (expense) => expense.category.toLowerCase() === filterLower
    );
  }

  getExpensesByCategory(category) {
    return this.getAllExpenses(category);
  }

  getExpenseById(id) {
    return this.expenses.find((e) => e.id === id) || null;
  }

  deleteExpense(id) {
    const index = this.expenses.findIndex((e) => e.id === id);
    if (index === -1) {
      return false;
    }
    this.expenses.splice(index, 1);
    this.save();
    return true;
  }

  getCategoryTotal(category) {
    const filtered = this.getExpensesByCategory(category);
    let categoryTotal = 0;
    for (const expense of filtered) {
      categoryTotal += expense.amount;
    }
    categoryTotal = Number(categoryTotal.toFixed(2));

    // Find exact formatted category casing if available
    const matchedCategoryName = filtered.length > 0 ? filtered[0].category : category;

    return {
      category: matchedCategoryName,
      total_amount: categoryTotal,
      total_count: filtered.length,
      expenses: filtered,
    };
  }

  getTotals(categoryFilter) {
    if (categoryFilter) {
      return this.getCategoryTotal(categoryFilter);
    }

    let overallTotal = 0;
    const byCategory = {};

    for (const expense of this.expenses) {
      overallTotal += expense.amount;
      const cat = expense.category;
      if (!byCategory[cat]) {
        byCategory[cat] = 0;
      }
      byCategory[cat] += expense.amount;
    }

    overallTotal = Number(overallTotal.toFixed(2));
    const formattedByCategory = {};
    for (const [cat, sum] of Object.entries(byCategory)) {
      formattedByCategory[cat] = Number(sum.toFixed(2));
    }

    return {
      overall_total: overallTotal,
      total_count: this.expenses.length,
      by_category: formattedByCategory,
    };
  }

  clear() {
    this.expenses = [];
    this.save();
  }
}

module.exports = new ExpenseService();
