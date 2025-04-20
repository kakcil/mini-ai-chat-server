const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
require('dotenv').config();

describe('Auth API Test', () => {
  describe('POST /api/auth/login', () => {
    it('should return valid JWT token and user data', async () => {
      //makes a request to the login endpoint with test credentials
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: '123456'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      expect(typeof response.body.token).toBe('string');
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe('test@example.com');
      
      //verifies token is valid and contains correct user data
      const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET || 'your-jwt-secret');
      expect(decoded).toBeDefined();
      expect(decoded.user).toBeDefined();
      expect(decoded.user.email).toBe('test@example.com');
      expect(decoded.exp).toBeDefined();
      expect(decoded.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
    });
  });
}); 