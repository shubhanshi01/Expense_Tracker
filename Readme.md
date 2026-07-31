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

## 🧪 How to Test the API (Swagger & Postman / cURL)

### 1. Interactive Testing via Swagger UI (Recommended)

1. Start the server using `npm start`.
2. Open your browser and navigate to **`http://localhost:3000/docs`**.
3. Expand any endpoint (e.g. `POST /expenses`) and click **Try it out**.
4. Input sample JSON body:
   ```json
   {
     "title": "Groceries",
     "amount": 45.50,
     "category": "Food",
     "date": "2026-07-31"
   }
   ```
5. Click **Execute** to view the live HTTP status code `201 Created` and returned response object.

---

### 2. Testing via Postman or cURL

Base URL: `http://localhost:3000`

#### A. Add an Expense (`POST /expenses`)
- **Method**: `POST`
- **URL**: `http://localhost:3000/expenses`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Grocery Shopping",
    "amount": 45.50,
    "category": "Food",
    "date": "2026-07-31"
  }
  ```
- **cURL Command**:
  ```bash
  curl -X POST http://localhost:3000/expenses \
    -H "Content-Type: application/json" \
    -d '{"title": "Grocery Shopping", "amount": 45.50, "category": "Food", "date": "2026-07-31"}'
  ```

#### B. View All Expenses (`GET /expenses`)
- **Method**: `GET`
- **URL**: `http://localhost:3000/expenses`
- **cURL Command**:
  ```bash
  curl -X GET http://localhost:3000/expenses
  ```

#### C. Filter Expenses by Category (`GET /expenses?category=Food`)
- **Method**: `GET`
- **URL**: `http://localhost:3000/expenses?category=Food`
- **cURL Command**:
  ```bash
  curl -X GET "http://localhost:3000/expenses?category=Food"
  ```

#### D. Calculate Total Expenses (`GET /expenses/totals`)
- **Method**: `GET`
- **URL**: `http://localhost:3000/expenses/totals`
- **cURL Command**:
  ```bash
  curl -X GET http://localhost:3000/expenses/totals
  ```
- **Sample Response**:
  ```json
  {
    "overall_total": 45.50,
    "total_count": 1,
    "by_category": {
      "Food": 45.50
    }
  }
  ```

#### E. Get Single Expense by ID (`GET /expenses/:id`)
- **Method**: `GET`
- **URL**: `http://localhost:3000/expenses/<EXPENSE_ID>`
- **cURL Command**:
  ```bash
  curl -X GET http://localhost:3000/expenses/YOUR_EXPENSE_ID_HERE
  ```

#### F. Delete Expense by ID (`DELETE /expenses/:id`)
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/expenses/<EXPENSE_ID>`
- **cURL Command**:
  ```bash
  curl -X DELETE http://localhost:3000/expenses/YOUR_EXPENSE_ID_HERE
  ```

---

## API Endpoints Summary Table

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
