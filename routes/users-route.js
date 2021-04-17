const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');

router.get('/', usersController.getAllUsers)
  .get('/:id', usersController.getUserById)
  .post('/', usersController.addUser)
  .put('/:id/deposit', usersController.deposit)
  .put('/:id/credit', usersController.setcredit)
  .put('/:id/withdraw', usersController.withdraw)
  .put('/:id/transfer', usersController.transfer);

module.exports = router;