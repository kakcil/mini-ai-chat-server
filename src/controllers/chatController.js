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

    //generates AI response - simulate a brief delay
    const aiResponse = await new Promise(resolve => {
      setTimeout(() => {
        resolve(`Response as ${character.name}: ${message.length > 10 ? 'That\'s an interesting topic!' : 'Can you provide more information?'}`);
      }, 1000); //small delay for Swagger testing (1s)
    });

    //saves AI response to database
    const aiMessage = new Message({
      userId,
      characterId,
      role: 'ai',
      text: aiResponse
    });
    await aiMessage.save();

    //returns complete response for Swagger testing
    res.json({
      success: true,
      conversation: {
        userMessage: {
          id: userMessage._id,
          text: message,
          timestamp: userMessage.timestamp
        },
        aiResponse: {
          id: aiMessage._id,
          text: aiResponse,
          timestamp: aiMessage.timestamp
        }
      },
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//GET /api/chat/history/:userId/:characterId
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

    // Transform messages into a more readable format for Swagger
    const formattedMessages = messages.map(msg => ({
      _id: msg._id,
      userId: msg.userId,
      characterId: msg.characterId,
      role: msg.role,
      text: msg.text,
      timestamp: msg.timestamp
    }));

    res.json(formattedMessages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}; 