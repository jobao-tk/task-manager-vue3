const jwt = require('jsonwebtoken');
const db = require('../models');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await db.User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { username } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
