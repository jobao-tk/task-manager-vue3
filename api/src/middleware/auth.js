const jwt = require('jsonwebtoken');
const db = require('../models');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'secret');
    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = authenticate;
