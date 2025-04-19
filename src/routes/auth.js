const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: {type: string, format: email}
 *               password: {type: string, format: password, description: "Min 6 characters"}
 *     responses:
 *       200: {description: "Token and user information returned"}
 *       400: {description: "Invalid login credentials"}
 */
router.post('/login', authController.login);

module.exports = router; 