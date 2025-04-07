const request = require('supertest');
const app = require('../server');

describe('Server', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Welcome to Gaming Console Booking API');
  });
}); 