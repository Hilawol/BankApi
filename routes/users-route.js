const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');

router.get('/', usersController.getAllUsers)
  .get('/:id', usersController.getUserById)
  .post('/', (req, res) => {

  })
  .put('/:id/deposit', usersController.deposit);

module.exports = router;