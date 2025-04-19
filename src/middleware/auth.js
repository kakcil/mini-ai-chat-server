const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  //token can be received from 2 different headers: x-auth-token or Authorization
  //first checks the Authorization header (for Swagger)
  let token = req.header('Authorization');
  
  //if Authorization header exists and starts with Bearer, remove the Bearer part
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7); //removes "Bearer " (7 characters)
  } else {
    //if Authorization header doesn't exist or isn't Bearer format, check x-auth-token
    token = req.header('x-auth-token');
  }

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