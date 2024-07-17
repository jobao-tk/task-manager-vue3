const db = require('../models'); // Certifique-se de que o caminho está correto

// Função para listar todas as tarefas
 const getTasks = async (req, res) => {
  try {
    const tasks = await db.Task.findAll({
      include: [{
        model: db.User
      }],
      order: [
        ['title', 'DESC'],
      ],
    });
    console.log(tasks);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas', error });
  }
};

// Função para buscar uma tarefa por ID
 const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await db.Task.findByPk(id, {
      include: [{
        model: db.User
      }]
    });
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefa', error });
  }
};

// Função para criar uma nova tarefa
 const createTask = async (req, res) => {
  const { title, description, priority, status, userId } = req.body;
  try {
    const newTask = await db.Task.create({ title, description, priority, status, userId });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa', error });
  }
};

// Função para atualizar uma tarefa
 const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority } = req.body;
  try {
    const task = await db.Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    await db.Task.update({ title, description, priority }, { where: { id: id }});
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
  }
};

// Função para atualizar uma tarefa
const completeTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await db.Task.findByPk(id);
    const status = 1;
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    await db.Task.update({ status }, { where: { id: id }});
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
  }
};

// Função para deletar uma tarefa
 const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await db.Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    await db.Task.destroy({ where: { id: id } });
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar tarefa', error });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  completeTask,
  createTask,
  updateTask,
  deleteTask
};