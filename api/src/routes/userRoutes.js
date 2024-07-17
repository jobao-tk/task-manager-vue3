const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getUsers);
// router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

module.exports = router;
