const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//POST /api/auth/login
//user login and creates JWT token
router.post('/login', authController.login);

module.exports = router; 