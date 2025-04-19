const express = require('express');
const connectDB = require('./config/db');
const { swaggerUi, specs } = require('./config/swagger');
const cors = require('cors');
require('dotenv').config();

//start express app
const app = express();

//enable CORS for all routes
app.use(cors());

//parses json bodies in the request
app.use(express.json());

//connects to db
connectDB();

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

//port setup
const PORT = process.env.PORT || 3000;

//starts server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger Documentation available at http://localhost:${PORT}/api-docs`);
}); 