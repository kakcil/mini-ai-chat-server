const request = require('supertest');
const app = require('../src/app');
require('dotenv').config();

//auth middleware mock to bypass authentication
jest.mock('../src/middleware/auth', () => (req, res, next) => {
  req.user = { id: 'testUserId' };
  next();
});

describe('Chat API Test', () => {
  it('validates request parameters correctly', async () => {
    //test API validation by intentionally omitting userId parameter
    const response = await request(app)
      .post('/api/chat')
      .send({
        characterId: 'testCharacterId',
        message: 'Hello world'
      })
      .set('Content-Type', 'application/json');

    //API should reject the request with 400 Bad Request
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });
}); 