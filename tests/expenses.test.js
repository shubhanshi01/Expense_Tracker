const request = require('supertest');
const app = require('../src/app');
const expenseService = require('../src/services/expenseService');

describe('Smart Expense Tracker REST API Test Suite', () => {
  beforeEach(() => {
    expenseService.clear();
  });

  describe('GET /', () => {
    it('should return welcome message and endpoint catalog', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('docs', '/docs');
    });
  });

  describe('POST /expenses', () => {
    it('should create a valid expense successfully', async () => {
      const payload = {
        title: 'Groceries',
        amount: 45.5,
        category: 'Food',
        date: '2026-07-31'
      };

      const res = await request(app).post('/expenses').send(payload);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe('Groceries');
      expect(res.body.amount).toBe(45.5);
      expect(res.body.category).toBe('Food');
      expect(res.body.date).toBe('2026-07-31');
    });

    it('should reject creation when title is missing or empty', async () => {
      const res = await request(app).post('/expenses').send({
        title: '   ',
        amount: 50,
        category: 'Food',
        date: '2026-07-31'
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should reject creation when amount is invalid or non-positive', async () => {
      const res1 = await request(app).post('/expenses').send({
        title: 'Coffee',
        amount: -10,
        category: 'Food',
        date: '2026-07-31'
      });
      expect(res1.status).toBe(400);

      const res2 = await request(app).post('/expenses').send({
        title: 'Coffee',
        amount: 'invalid',
        category: 'Food',
        date: '2026-07-31'
      });
      expect(res2.status).toBe(400);
    });

    it('should reject creation when date format is invalid', async () => {
      const res = await request(app).post('/expenses').send({
        title: 'Movie Ticket',
        amount: 15,
        category: 'Entertainment',
        date: 'invalid-date-string'
      });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /expenses & Category Filtering', () => {
    it('should return empty list when no expenses exist', async () => {
      const res = await request(app).get('/expenses');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });

    it('should return all created expenses', async () => {
      await request(app).post('/expenses').send({
        title: 'Lunch',
        amount: 12.5,
        category: 'Food',
        date: '2026-07-31'
      });
      await request(app).post('/expenses').send({
        title: 'Bus Pass',
        amount: 50,
        category: 'Transport',
        date: '2026-07-31'
      });

      const res = await request(app).get('/expenses');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it('should filter expenses by category case-insensitively', async () => {
      await request(app).post('/expenses').send({
        title: 'Burger',
        amount: 10,
        category: 'Food',
        date: '2026-07-31'
      });
      await request(app).post('/expenses').send({
        title: 'Taxi',
        amount: 25,
        category: 'Transport',
        date: '2026-07-31'
      });

      const res = await request(app).get('/expenses?category=food');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe('Burger');
    });
  });

  describe('GET /expenses/totals', () => {
    it('should calculate overall total and by-category breakdown accurately', async () => {
      await request(app).post('/expenses').send({
        title: 'Grocery 1',
        amount: 20.45,
        category: 'Food',
        date: '2026-07-30'
      });
      await request(app).post('/expenses').send({
        title: 'Grocery 2',
        amount: 15.55,
        category: 'Food',
        date: '2026-07-31'
      });
      await request(app).post('/expenses').send({
        title: 'Fuel',
        amount: 40.0,
        category: 'Transport',
        date: '2026-07-31'
      });

      const res = await request(app).get('/expenses/totals');
      expect(res.status).toBe(200);
      expect(res.body.total_count).toBe(3);
      expect(res.body.overall_total).toBe(76);
      expect(res.body.by_category).toEqual({
        Food: 36,
        Transport: 40
      });
    });
  });

  describe('GET /expenses/:id & DELETE /expenses/:id', () => {
    it('should retrieve a specific expense by ID', async () => {
      const created = await request(app).post('/expenses').send({
        title: 'Book',
        amount: 29.99,
        category: 'Education',
        date: '2026-07-31'
      });
      const id = created.body.id;

      const res = await request(app).get(`/expenses/${id}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(id);
      expect(res.body.title).toBe('Book');
    });

    it('should return 404 for non-existent expense ID', async () => {
      const res = await request(app).get('/expenses/non-existent-uuid');
      expect(res.status).toBe(404);
    });

    it('should delete an expense by ID successfully', async () => {
      const created = await request(app).post('/expenses').send({
        title: 'Coffee',
        amount: 4.5,
        category: 'Food',
        date: '2026-07-31'
      });
      const id = created.body.id;

      const delRes = await request(app).delete(`/expenses/${id}`);
      expect(delRes.status).toBe(200);

      const getRes = await request(app).get(`/expenses/${id}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 when deleting a non-existent expense', async () => {
      const res = await request(app).delete('/expenses/missing-id-123');
      expect(res.status).toBe(404);
    });
  });
});
