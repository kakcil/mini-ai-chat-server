const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();

//connects to MongoDB
connectDB();

//port setup
const PORT = process.env.PORT || 3000;

//starts server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger Documentation available at http://localhost:${PORT}/api-docs`);
}); 