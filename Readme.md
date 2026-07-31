# Smart Expense Tracker REST API

A lightweight, robust, and fully-tested REST API for managing personal expenses, built with **Node.js** and **Express.js** following a clean, modular Controller-Service-Middleware architecture.

---

## What Was Built

The Smart Expense Tracker REST API allows users to create, view, filter, summarize, and delete personal expenses with automated validation and local JSON data persistence.

### Key Features
- **Add Expense (`POST /expenses`)**: Creates an expense with fields: `id` (auto-generated UUID), `title`, `amount`, `category`, and `date`. Includes strict validation via middleware (`src/middleware/validateExpense.js`).
- **View All Expenses (`GET /expenses`)**: Retrieves all stored expenses.
- **Filter Expenses by Category (`GET /expenses?category={category_name}`)**: Filters expenses matching the category (case-insensitive).
- **Calculate Totals (`GET /expenses/totals`)**: Calculates overall total spent, total count, and category breakdown.
- **Get Expense by ID (`GET /expenses/:id`)**: Retrieves a single expense by unique ID.
- **Delete Expense (`DELETE /expenses/:id`)**: Removes an expense by unique ID.
- **OpenAPI / Swagger Documentation (Bonus Feature)**: Interactive Swagger UI documentation available live at `http://localhost:3000/docs`.

---

## Installation

Ensure you have [Node.js](https://nodejs.org/) (v16+ recommended) installed.

Clone the repository and install dependencies by running:

```bash
npm install
```

---

## Running the Server

To start the API server locally:

```bash
npm start
```

The server will launch on **`http://localhost:3000`**.

You can access the interactive **Swagger API Documentation** at:
👉 **`http://localhost:3000/docs`**

---

## Running the Tests

To run the automated test suite with Jest:

```bash
npm test
```

All unit and integration tests cover happy paths, edge cases, category filtering, totals calculation, input validation errors, and deletion handling.

---

## API Endpoints Overview

| Method | Endpoint | Description | Sample Payload / Query |
| :--- | :--- | :--- | :--- |
| `POST` | `/expenses` | Add a new expense | `{"title": "Groceries", "amount": 45.50, "category": "Food", "date": "2026-07-31"}` |
| `GET` | `/expenses` | Retrieve all expenses | Optional query: `?category=Food` |
| `GET` | `/expenses/totals` | Get total expenses summary | Returns `{ overall_total, total_count, by_category }` |
| `GET` | `/expenses/:id` | Get expense details by ID | Path param: `:id` |
| `DELETE` | `/expenses/:id` | Delete an expense by ID | Path param: `:id` |
| `GET` | `/docs` | OpenAPI / Swagger UI | Interactive Web UI |

---

## Repository Structure

```
smart-expense-tracker-api/
├── README.md              # Project documentation, setup & test commands
├── AI_NOTES.md             # Transparent AI collaboration & engineering log
├── package.json           # Project dependencies & npm scripts
├── package-lock.json      # Locked dependency versions
├── .gitignore             # Git ignore patterns
├── src/
│   ├── app.js             # Express app setup & middleware integration
│   ├── server.js          # Application entrypoint & HTTP server listener
│   ├── controllers/
│   │   └── expenseController.js # REST HTTP controllers & response handlers
│   ├── routes/
│   │   └── expenseRoutes.js     # API route endpoints definition
│   ├── services/
│   │   └── expenseService.js    # Data service layer & JSON file persistence
│   ├── middleware/
│   │   ├── errorHandler.js      # Global centralized error handling middleware
│   │   └── validateExpense.js   # Request validation middleware
│   ├── config/
│   │   └── swagger.js           # Swagger / OpenAPI 3.0 configuration
│   └── data/
│       └── expenses.json        # Persistent JSON data store
└── tests/
    └── expenses.test.js         # Jest & Supertest integration test suite
```
