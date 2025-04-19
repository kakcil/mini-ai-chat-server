const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');
const auth = require('../middleware/auth');

//GET /api/characters
//gets all characters
router.get('/', auth, characterController.getAllCharacters);

//GET /api/characters/:id
//gets character by id
router.get('/:id', auth, characterController.getCharacterById);

//POST /api/characters
//creates new character
router.post('/', auth, characterController.createCharacter);

module.exports = router; 