const Character = require('../models/Character');

//GET /api/characters
//gets all characters
exports.getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find().select('-basePrompt');
    res.json(characters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//GET /api/characters/:id
//gets character by id
exports.getCharacterById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    
    res.json(character);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Character not found' });
    }
    
    res.status(500).send('Server error');
  }
};

//POST /api/characters
//creates new character
exports.createCharacter = async (req, res) => {
  const { name, basePrompt, description } = req.body;

  try {
    //creates new character
    const newCharacter = new Character({
      name,
      basePrompt,
      description
    });

    const character = await newCharacter.save();
    res.json(character);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}; 