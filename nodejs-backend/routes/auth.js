const express = require('express');
const { registerUser, loginUser, getAuthStatus } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/status', getAuthStatus);

module.exports = router;