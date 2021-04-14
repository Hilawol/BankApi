const express = require('express');
const router = express.Router();

const users = require('../data/users.json');

router.get('/', (req, res) => {
  return res.status(200).send(users);

}).get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id == id);
  if (user) {
    return res.status(200).send(user);
  }
  else {
    return res.status(404).send("User not found.");
  }
}).post('/', (req, res) => {

});

module.exports = router;