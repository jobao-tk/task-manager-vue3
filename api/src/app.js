const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const authenticate = require('./middleware/auth');

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/users', authenticate, userRoutes);
app.use('/api/tasks', authenticate, taskRoutes);

module.exports = app;
