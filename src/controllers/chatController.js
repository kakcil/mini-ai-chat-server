const Character = require('../models/Character');
const Message = require('../models/Message');
const mongoose = require('mongoose');

//POST /api/chat
//sends message and gets AI response
exports.sendMessage = async (req, res) => {
  const { userId, characterId, message } = req.body;

  try {
    //validates ObjectID
    if (!mongoose.Types.ObjectId.isValid(characterId)) {
      return res.status(400).json({ message: 'Invalid character ID' });
    }

    //finds character
    const character = await Character.findById(characterId);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    //saves user message
    const userMessage = new Message({
      userId,
      characterId,
      role: 'user',
      text: message
    });
    await userMessage.save();

    //simulates AI response
    setTimeout(async () => {
      //uses character's base prompt to generate response (instead of real LLM)
      const aiResponse = `Response as ${character.name}: ${message.length > 10 ? 'That\'s an interesting topic!' : 'Can you provide more information?'}`;

      //saves AI response
      const aiMessage = new Message({
        userId,
        characterId,
        role: 'ai',
        text: aiResponse
      });
      await aiMessage.save();
    }, 500);

    res.json({ 
      success: true, 
      message: 'Message sent, processing response...',
      userMessageId: userMessage._id
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//GET /api/chat-history/:userId/:characterId
//gets chat history between user and character
exports.getChatHistory = async (req, res) => {
  const { userId, characterId } = req.params;

  try {
    //validates ObjectIDs
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(characterId)) {
      return res.status(400).json({ message: 'Invalid user or character ID' });
    }

    //finds messages
    const messages = await Message.find({
      userId,
      characterId
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}; 