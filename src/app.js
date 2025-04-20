const express = require('express');
const cors = require('cors');
const { swaggerUi, specs } = require('./config/swagger');
require('dotenv').config();

//creates express app
const app = express();

//enables CORS for all routes
app.use(cors());

//parses JSON bodies
app.use(express.json());

//swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

//defines routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const characterRoutes = require('./routes/characters');

//uses routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/characters', characterRoutes);

//basic route
app.get('/', (_, res) => {
  res.send('AI Chat Platform API - Welcome');
});

module.exports = app; //exports app for testing 