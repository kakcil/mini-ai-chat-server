const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  //gets token from header
  const token = req.header('x-auth-token');

  //if no token
  if (!token) {
    return res.status(401).json({ message: 'No authorization token, access denied' });
  }

  //verifies token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}; 