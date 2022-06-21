const express = require('express');
const usersController = require('../controller/users.controller');

const router = express.Router();

router.get('/', usersController.getAllUsers);

router.post('/', usersController.addUser);

router.patch('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;