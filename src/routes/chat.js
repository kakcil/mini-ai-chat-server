const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

//POST /api/chat
//sends message and gets AI response
router.post('/', auth, chatController.sendMessage);

//GET /api/chat-history/:userId/:characterId
//gets chat history between user and character
router.get('/history/:userId/:characterId', auth, chatController.getChatHistory);

module.exports = router; 