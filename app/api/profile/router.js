const express = require('express');
const router = express.Router();
const { getProfileById, updateProfile } = require('./controller');

router.get('/profile/:user_id', getProfileById);
router.put('/profile/update/:user_id', updateProfile);

module.exports = router;
