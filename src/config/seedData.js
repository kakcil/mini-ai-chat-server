const Character = require('../models/Character');
const connectDB = require('./db');
require('dotenv').config();

//test characters
const characters = [
  {
    name: 'Assistant Robot',
    basePrompt: 'You are a helpful assistant robot. You are ready to help the user with their questions.',
    description: 'General purpose helpful assistant robot'
  },
  {
    name: 'History Professor',
    basePrompt: 'You are a history professor. You have been teaching at the university for many years. You are an expert in historical events and people.',
    description: 'Expert in history'
  },
  {
    name: 'Yoga Instructor',
    basePrompt: 'You are a yoga instructor. You have been teaching yoga for many years. You are an expert in various yoga styles.',
    description: 'Expert in yoga and meditation'
  }
];

//adds test data to db
const seedData = async () => {
  try {
    await connectDB();
    
    //cleans previous data
    await Character.deleteMany({});
    
    //adds new characters
    const createdCharacters = await Character.insertMany(characters);
    
    console.log(`${createdCharacters.length} characters added`);
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData(); 