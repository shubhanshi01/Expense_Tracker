const validateExpense = (req, res, next) => {
  const { title, amount, category, date } = req.body || {};
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim() === '') {
    errors.push('title is required and must be a non-empty string');
  }

  if (amount === undefined || amount === null || typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    errors.push('amount is required and must be a positive number greater than 0');
  }

  if (!category || typeof category !== 'string' || category.trim() === '') {
    errors.push('category is required and must be a non-empty string');
  }

  if (!date || typeof date !== 'string' || isNaN(Date.parse(date))) {
    errors.push('date is required and must be a valid date string (e.g. YYYY-MM-DD)');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation Error',
      details: errors,
      message: errors.join(', ')
    });
  }

  next();
};

module.exports = validateExpense;
