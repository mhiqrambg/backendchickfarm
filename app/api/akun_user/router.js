const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUsers,
  deleteUserById,
} = require('./controller');

router.get('/users', getAllUsers);
router.get('/users/:id_users', getUserById);
router.post('/users', createUsers);
router.delete('/users/:id_user', deleteUserById);

module.exports = router;
