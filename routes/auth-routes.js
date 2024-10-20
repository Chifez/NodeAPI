const router = require('express').Router();
const { register, login } = require('../controllers/auth-controllers');

// REGISTER
router.post('/register', register);

// LOGIN
router.post('/login', login);

module.exports = router;
