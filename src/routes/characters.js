const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Character:
 *       type: object
 *       required: [name, description, personality]
 *       properties:
 *         id: {type: string}
 *         name: {type: string}
 *         description: {type: string}
 *         personality: {type: string}
 *         imageUrl: {type: string}
 */

/**
 * @swagger
 * /api/characters:
 *   get:
 *     tags: [Characters]
 *     summary: Get all characters
 *     security: [{bearerAuth: []}]
 *     responses:
 *       200: 
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 */
router.get('/', auth, characterController.getAllCharacters);

/**
 * @swagger
 * /api/characters/{id}:
 *   get:
 *     tags: [Characters]
 *     summary: Get character by id
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - {in: path, name: id, required: true, schema: {type: string}}
 *     responses:
 *       200: {description: "Character information", content: {application/json: {schema: {$ref: '#/components/schemas/Character'}}}}
 *       404: {description: "Character not found"}
 */
router.get('/:id', auth, characterController.getCharacterById);

/**
 * @swagger
 * /api/characters:
 *   post:
 *     tags: [Characters]
 *     summary: Create new character
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Character'
 *     responses:
 *       201: {description: "Character created"}
 *       400: {description: "Invalid request"}
 */
router.post('/', auth, characterController.createCharacter);

module.exports = router; 