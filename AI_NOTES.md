# AI Notes & Collaboration Log

This document provides a transparent overview of how AI tools (specifically Google DeepMind's Antigravity coding assistant) were utilized during the development of the **Smart Expense Tracker REST API**.

---

## 1. Code Attribution: AI-Generated vs. Human-Written

### AI-Generated Components
- **Express Route & Controller Boilerplate (`src/controllers/expenseController.js`, `src/routes/expenseRoutes.js`)**: Controller functions for HTTP handlers (`createExpense`, `getAllExpenses`, `getExpenseById`, `getTotals`, `deleteExpense`).
- **OpenAPI / Swagger Config (`src/config/swagger.js`)**: OpenAPI 3.0 JSDoc spec generation and configuration.
- **Middleware Skeletons (`src/middleware/validateExpense.js`, `src/middleware/errorHandler.js`)**: Middleware structures for input validation and centralized error handling.
- **Initial Jest Test Suite (`tests/expenses.test.js`)**: Basic Supertest test case skeletons for endpoints.

### Human-Engineered & Directed Components
- **Architectural Design (Controller-Service-Middleware Pattern)**: Structuring the repository into modular components (`controllers/`, `services/`, `middleware/`, `config/`, `data/`).
- **Validation Logic & Error Responses (`src/middleware/validateExpense.js`)**: Strict validation rules ensuring non-empty string `title`, positive float `amount` (>0), non-empty string `category`, and valid ISO/YYYY-MM-DD `date`.
- **Floating-Point Accumulation Fixes (`src/services/expenseService.js`)**: Enforcing strict 2-decimal precision rounding (`.toFixed(2)`) to handle JavaScript floating-point inaccuracies.
- **Test Environment Data Isolation (`src/services/expenseService.js`)**: Implementing `process.env.NODE_ENV === 'test'` checks to prevent test runs from polluting or overwriting the persistent `src/data/expenses.json` file on disk.

---

## 2. Validation, Testing, and Changes Made to AI Output

### Validation Error Response Standardization
- **Issue Found**: Initial AI-generated validation returned generic 400 error strings without a structured payload breakdown.
- **Human Modification**: Created a dedicated `validateExpense.js` middleware returning structured JSON with an `error`, `details` array, and formatted `message` string.

### Floating-Point Accumulation Fix
- **Issue Found**: Initial AI total calculation used simple `reduce()` addition (`acc + curr.amount`), resulting in imprecise floating-point results (e.g. `10.10 + 20.20` resulted in `30.299999999999997`).
- **Human Modification**: Added explicit `.toFixed(2)` rounding converted back to `Number(...)` for both `overall_total` and individual category totals in `by_category`.

### Category Filtering Case-Sensitivity & Trimming
- **Issue Found**: AI's original category filter matched string values strictly (`expense.category === category`), missing matches when user queries had different casing (e.g. `?category=food` vs stored `"Food"`).
- **Human Modification**: Standardized `getAllExpenses(categoryFilter)` in `expenseService.js` to normalize both query input and stored category strings using `.trim().toLowerCase()`.

### Test Suite Isolation & Clean Teardown
- **Issue Found**: Sequential test executions failed due to accumulated state between test cases.
- **Human Modification**: Implemented `beforeEach(() => expenseService.clear())` to guarantee deterministic state reset before every test execution.

---

## 3. Rejected AI Suggestions & Rationale

1. **Rejected Relational Database / ORM (Prisma / SQLite)**
   - *AI Suggestion*: AI initially suggested introducing SQLite via Prisma or Sequelize for persistent storage.
   - *Rationale for Rejection*: The assignment guidelines state *"Data can be stored in memory or a local JSON file; no database is required."* Using a JSON file at `src/data/expenses.json` keeps the project lightweight and eliminates external binary dependencies.

2. **Rejected Full TypeScript Compilation Step**
   - *AI Suggestion*: AI recommended compiling with `tsc` and configuring a build pipeline.
   - *Rationale for Rejection*: Standard Node.js with JavaScript avoids build-step friction for automated grading environments and executes cleanly via standard `npm start` and `npm test`.

3. **Rejected Complex Query Pagination & Sorting Parameters**
   - *AI Suggestion*: AI suggested adding `page`, `limit`, `sort_by`, and `sort_order` query parameters to `GET /expenses`.
   - *Rationale for Rejection*: To adhere strictly to the project scope and 4-hour allocation, extra unrequested parameters were omitted to keep the API focused, clean, and robust.
