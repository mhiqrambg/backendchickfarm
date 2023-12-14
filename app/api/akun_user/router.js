const express = require('express');
const router = express.Router();
const {
  getUserByName,
  getAllUsers,
  getUserById,
  createUsers,
} = require('./controller');

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.get('/users/:username', getUserByName);
router.post('/users', createUsers);

module.exports = router;
