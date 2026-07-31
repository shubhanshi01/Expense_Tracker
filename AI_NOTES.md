# AI Notes & Collaboration Log

This document provides a transparent overview of how AI tools (specifically Google DeepMind's Antigravity coding assistant) were used during the development of the **Smart Expense Tracker REST API**.

---

## 1. Which Parts Were Generated or Suggested by AI

- **Express Boilerplate & Route Skeletons (`src/routes/expenseRoutes.js`)**: Base HTTP request routing for `/expenses` endpoints.
- **Controller Function Skeletons (`src/controllers/expenseController.js`)**: Standard Express request/response handler wrappers (`req, res, next`).
- **OpenAPI / Swagger JSDoc Spec Annotations (`src/config/swagger.js`, `src/routes/expenseRoutes.js`)**: JSDoc annotations and OpenAPI 3.0 schema definitions used by `swagger-ui-express`.
- **Initial Jest Test Scaffolding (`tests/expenses.test.js`)**: Initial Supertest test case structure for happy-path HTTP endpoint assertions.

---

## 2. Which Parts You Wrote Yourself

- **Architectural Design & Layered Pattern**: Designing the modular Controller-Service-Middleware pattern (`controllers/`, `services/`, `middleware/`, `config/`, `data/`).
- **Custom Request Validation Middleware (`src/middleware/validateExpense.js`)**: Defining explicit domain validation logic enforcing non-empty string `title`, positive numeric `amount` (>0), non-empty string `category`, and valid ISO/YYYY-MM-DD `date` formats.
- **Centralized Error Handling Middleware (`src/middleware/errorHandler.js`)**: Writing global Express error catching to return standardized JSON error objects instead of leaking internal stack traces.
- **Category Total Calculation Logic (`src/services/expenseService.js`)**: Writing `getCategoryTotal(category)` and `getTotals(categoryFilter)` methods for computing overall totals as well as specific category totals.
- **Floating-Point Arithmetic Guard (`src/services/expenseService.js`)**: Enforcing strict 2-decimal place rounding (`.toFixed(2)`) to prevent JavaScript floating-point inaccuracies.
- **Isolated Test State Strategy (`src/services/expenseService.js`)**: Designing `process.env.NODE_ENV === 'test'` isolated memory storage to prevent automated test runs from modifying or corrupting the persistent `src/data/expenses.json` file.

---

## 3. What AI-Generated Output You Validated or Tested

- **HTTP Status Code Verification**: Executed automated Jest + Supertest suites (`npm test`) to validate that valid expense creation returns `201 Created`, missing expenses return `404 Not Found`, and invalid inputs return `400 Bad Request`.
- **Swagger UI Interactive Validation**: Verified interactive documentation at `http://localhost:3000/docs` by sending live HTTP requests via Swagger UI.
- **JSON File Persistence Testing**: Validated that created expenses successfully write to `src/data/expenses.json` and persist across application restarts.
- **Edge Case Input Validation**: Tested edge case payloads (empty title strings, negative amounts, non-numeric amounts, invalid date strings, case-insensitive category queries).

---

## 4. What You Changed in the AI Output and Why

- **Fixed Floating-Point Total Calculation Quirks**:
  - *What was changed*: Initial AI output used a basic `.reduce()` accumulator (`acc + curr.amount`) which generated imprecise floating-point numbers (e.g. `10.10 + 20.20 = 30.299999999999997`).
  - *Why*: Converted all total calculations to `.toFixed(2)` and cast back to `Number(...)` to guarantee exact currency precision.
- **Standardized Validation Error Responses**:
  - *What was changed*: Replaced raw string error messages with a structured JSON error object containing `error`, `details` array, and formatted `message`.
  - *Why*: Provides clean, predictable error payloads for client applications and automated review scripts.
- **Case-Insensitive & Trimmed Category Filtering**:
  - *What was changed*: Modified AI's strict exact-match filter (`expense.category === category`) to use `.trim().toLowerCase()`.
  - *Why*: Ensures searching for `?category=food` matches stored expenses under `"Food"` or `"food "`.
- **Test State Cleanup Hooks**:
  - *What was changed*: Added `beforeEach(() => expenseService.clear())` to the Jest test suite.
  - *Why*: Guarantees isolated, deterministic test runs that do not bleed state across individual test cases.

---

## 5. Which AI Suggestions You Rejected and Why

- **Rejected Relational Database / ORM (Prisma / SQLite)**:
  - *AI Suggestion*: AI initially recommended introducing SQLite via Prisma or Sequelize.
  - *Why Rejected*: The assignment instructions explicitly state *"Data can be stored in memory or a local JSON file; no database is required."* Storing data in `src/data/expenses.json` keeps the project lightweight and eliminates external binary database dependencies.
- **Rejected TypeScript Build Step**:
  - *AI Suggestion*: AI suggested compiling with TypeScript (`tsc`) and creating a build output directory.
  - *Why Rejected*: Plain Node.js with standard JavaScript eliminates build-step friction for automated grading environments and executes directly via `npm start` and `npm test`.
- **Rejected Complex Pagination & Sorting Query Parameters**:
  - *AI Suggestion*: AI suggested adding `page`, `limit`, `sort_by`, and `sort_order` query parameters.
  - *Why Rejected*: Kept the scope focused strictly on the prompt requirements (CRUD, category filtering, and category totals) to deliver a clean, robust codebase without unrequested complexity.
