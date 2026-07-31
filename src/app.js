const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const expenseRoutes = require('./routes/expenseRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// OpenAPI / Swagger Documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base health & index route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Smart Expense Tracker REST API',
    docs: '/docs',
    endpoints: {
      add_expense: 'POST /expenses',
      view_all_expenses: 'GET /expenses',
      filter_by_category: 'GET /expenses?category={category_name}',
      calculate_totals: 'GET /expenses/totals',
      view_by_id: 'GET /expenses/{id}',
      delete_expense: 'DELETE /expenses/{id}',
    },
  });
});

// Expense API Routes
app.use('/', expenseRoutes);

// Global 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Centralized Error Handler Middleware
app.use(errorHandler);

module.exports = app;
