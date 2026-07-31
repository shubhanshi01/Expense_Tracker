# Smart Expense Tracker REST API

A lightweight, robust, and fully-tested REST API for managing personal expenses, built with **Node.js** and **Express.js** following a clean, modular Controller-Service-Middleware architecture.

---

## What You Built

The **Smart Expense Tracker REST API** is a personal expense management service that enables users to:
- **Add expenses** with fields `id` (auto-generated UUID), `title`, `amount`, `category`, and `date`. Includes strict input validation.
- **View all expenses** stored in the system.
- **Filter expenses by category** (e.g., Food, Transport, Utilities) using either path or query parameters.
- **Calculate total expenses** overall and for specific categories.
- **Delete an expense** by its unique ID.
- **Access OpenAPI / Swagger interactive documentation** live at `http://localhost:3000/docs`.
- **Persist data locally** using a local JSON file (`src/data/expenses.json`) without requiring external databases.

---

## Technologies Used

- **Runtime**: [Node.js](https://nodejs.org/) (v16+ or latest LTS)
- **Web Framework**: [Express.js](https://expressjs.com/) (v4.19+)
- **Documentation**: [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) & [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) (OpenAPI 3.0)
- **ID Generation**: [uuid](https://www.npmjs.com/package/uuid) (v4 UUIDs)
- **Testing Framework**: [Jest](https://jestjs.io/) & [Supertest](https://www.npmjs.com/package/supertest)
- **Middleware**: [CORS](https://www.npmjs.com/package/cors) & custom validation/error-handling middleware
- **Storage**: Local JSON file storage (`src/data/expenses.json`)

---

## How to Install Dependencies

Make sure you have Node.js installed on your machine. Clone the repository and run:

```bash
npm install
```

---

## Exact Command to Start the Server

To start the API server locally:

```bash
npm start
```

- **API Base URL**: `http://localhost:3000`
- **Interactive Swagger Documentation**: `http://localhost:3000/docs`

---

## Exact Command to Run Tests

To run the automated test suite with Jest:

```bash
npm test
```

All 16 unit and integration test cases will run, verifying happy paths, edge cases, category filtering, totals calculation, input validation errors, and deletion handling.

---

## API Endpoint Documentation

| HTTP Method | Endpoint | Description | Query / Path Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/expenses` | Add a new expense | None |
| `GET` | `/expenses` | Retrieve all expenses | Optional query: `?category=Food` |
| `GET` | `/expenses/category/:category` | Filter expenses by category | Path param: `:category` |
| `GET` | `/expenses/totals` | Calculate total expenses (overall & category breakdown) | Optional query: `?category=Food` |
| `GET` | `/expenses/totals/category/:category` | Calculate total expenses for a specific category | Path param: `:category` |
| `GET` | `/expenses/:id` | Retrieve single expense details by ID | Path param: `:id` |
| `DELETE` | `/expenses/:id` | Delete an expense by ID | Path param: `:id` |
| `GET` | `/docs` | OpenAPI / Swagger UI Interactive Documentation | None |

---

## Example Requests and Responses

### 1. Add an Expense (`POST /expenses`)

**Request**:
`POST http://localhost:3000/expenses`
Headers: `Content-Type: application/json`

```json
{
  "title": "Grocery Shopping",
  "amount": 45.50,
  "category": "Food",
  "date": "2026-07-31"
}
```

**Response (201 Created)**:
```json
{
  "id": "e4b67912-3a5c-4f81-9b0d-7e21a4f56789",
  "title": "Grocery Shopping",
  "amount": 45.5,
  "category": "Food",
  "date": "2026-07-31"
}
```

---

### 2. View All Expenses (`GET /expenses`)

**Request**:
`GET http://localhost:3000/expenses`

**Response (200 OK)**:
```json
[
  {
    "id": "e4b67912-3a5c-4f81-9b0d-7e21a4f56789",
    "title": "Grocery Shopping",
    "amount": 45.5,
    "category": "Food",
    "date": "2026-07-31"
  },
  {
    "id": "b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
    "title": "Monthly Bus Pass",
    "amount": 60.0,
    "category": "Transport",
    "date": "2026-07-31"
  }
]
```

---

### 3. Filter Expenses by Category (`GET /expenses/category/:category` or `GET /expenses?category=Food`)

**Request**:
`GET http://localhost:3000/expenses/category/Food`

**Response (200 OK)**:
```json
[
  {
    "id": "e4b67912-3a5c-4f81-9b0d-7e21a4f56789",
    "title": "Grocery Shopping",
    "amount": 45.5,
    "category": "Food",
    "date": "2026-07-31"
  }
]
```

---

### 4. Calculate Overall Total Expenses (`GET /expenses/totals`)

**Request**:
`GET http://localhost:3000/expenses/totals`

**Response (200 OK)**:
```json
{
  "overall_total": 105.5,
  "total_count": 2,
  "by_category": {
    "Food": 45.5,
    "Transport": 60.0
  }
}
```

---

### 5. Calculate Total for a Specific Category (`GET /expenses/totals/category/:category`)

**Request**:
`GET http://localhost:3000/expenses/totals/category/Food`

**Response (200 OK)**:
```json
{
  "category": "Food",
  "total_amount": 45.5,
  "total_count": 1,
  "expenses": [
    {
      "id": "e4b67912-3a5c-4f81-9b0d-7e21a4f56789",
      "title": "Grocery Shopping",
      "amount": 45.5,
      "category": "Food",
      "date": "2026-07-31"
    }
  ]
}
```

---

### 6. Get Single Expense by ID (`GET /expenses/:id`)

**Request**:
`GET http://localhost:3000/expenses/e4b67912-3a5c-4f81-9b0d-7e21a4f56789`

**Response (200 OK)**:
```json
{
  "id": "e4b67912-3a5c-4f81-9b0d-7e21a4f56789",
  "title": "Grocery Shopping",
  "amount": 45.5,
  "category": "Food",
  "date": "2026-07-31"
}
```

---

### 7. Delete an Expense by ID (`DELETE /expenses/:id`)

**Request**:
`DELETE http://localhost:3000/expenses/e4b67912-3a5c-4f81-9b0d-7e21a4f56789`

**Response (200 OK)**:
```json
{
  "message": "Expense with ID 'e4b67912-3a5c-4f81-9b0d-7e21a4f56789' deleted successfully."
}
```

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
