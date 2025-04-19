const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/chat:
 *   post:
 *     tags: [Chat]
 *     summary: Send message and get AI response
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, characterId, message]
 *             properties:
 *               userId: {type: string}
 *               characterId: {type: string}
 *               message: {type: string}
 *     responses:
 *       200: {description: "AI character's response"}
 *       401: {description: "Authorization error"}
 */
router.post('/', auth, chatController.sendMessage);

/**
 * @swagger
 * /api/chat/history/{userId}/{characterId}:
 *   get:
 *     tags: [Chat]
 *     summary: Chat history
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - {in: path, name: userId, required: true, schema: {type: string}}
 *       - {in: path, name: characterId, required: true, schema: {type: string}}
 *     responses:
 *       200: {description: "Chat message list"}
 *       401: {description: "Authorization error"}
 */
router.get('/history/:userId/:characterId', auth, chatController.getChatHistory);

module.exports = router; 