const express = require('express');
const router = express.Router();
const { index, find, create, destroy } = require('./controller');

router.get('/users', index);
router.get('/users/:id', find);
router.post('/users', create);
router.delete('/users/:id_user', destroy);

module.exports = router;
