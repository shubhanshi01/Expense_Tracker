const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Smart Expense Tracker API server running on http://localhost:${PORT}`);
  console.log(`Swagger OpenAPI Documentation available at http://localhost:${PORT}/docs`);
});
