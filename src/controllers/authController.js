const jwt = require('jsonwebtoken');
require('dotenv').config();

//POST /api/auth/login
//user login and creates JWT token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //in a real app, user validation is done here
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    //basic validation (mock for demonstration purposes)
    //in a real app, you would check against database
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    
    //mock user (in real app, user is fetched from db)
    const user = {
      id: '60d0fe4f5311236168a109ca', // Mock a user id
      name: 'Test User',
      email: email || 'test@example.com'
    };

    //creates a JWT token
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
        //never includes password or sensitive data in JWT payload
        //as tokens can be decoded easily even though they are signed
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}; 