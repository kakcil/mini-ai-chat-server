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
 *               userId: {type: string, description: "User ID"}
 *               characterId: {type: string, description: "Character ID"}
 *               message: {type: string, description: "User message"}
 *     responses:
 *       200:
 *         description: Full conversation including user message and AI response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: {type: boolean}
 *                 conversation:
 *                   type: object
 *                   properties:
 *                     userMessage:
 *                       type: object
 *                       properties:
 *                         id: {type: string}
 *                         text: {type: string}
 *                         timestamp: {type: string, format: date-time}
 *                     aiResponse:
 *                       type: object
 *                       properties:
 *                         id: {type: string}
 *                         text: {type: string}
 *                         timestamp: {type: string, format: date-time}
 *       401: {description: "Authorization error"}
 *       404: {description: "Character not found"}
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
 *       200:
 *         description: List of chat messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id: {type: string}
 *                   userId: {type: string}
 *                   characterId: {type: string}
 *                   role: {type: string, enum: [user, ai]}
 *                   text: {type: string}
 *                   timestamp: {type: string, format: date-time}
 *       401: {description: "Authorization error"}
 */
router.get('/history/:userId/:characterId', auth, chatController.getChatHistory);

module.exports = router; 