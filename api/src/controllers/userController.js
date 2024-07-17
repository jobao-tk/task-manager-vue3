const db = require('../models');

const getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      include: [{
        model: db.Task
      }]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};

const checkToken = async (req, res) => {
  try {
    
    res.json({ok : true});
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};

// Função para buscar um usuário por ID com suas tarefas
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findByPk(id, {
      include: [{
        model: Task,
        as: 'Task'
      }]
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
};

// Função para criar um novo usuário
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await db.User.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await user.update({ username, email, password });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
};

// Função para deletar um usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await user.destroy();
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
