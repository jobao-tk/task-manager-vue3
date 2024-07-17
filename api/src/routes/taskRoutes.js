const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.get('/:id/complete', taskController.completeTask);
router.post('/', taskController.createTask);
router.patch('/:id/update', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
