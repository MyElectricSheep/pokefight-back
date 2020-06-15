var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController')
const authorizePlayer = require('../middlewares/playerAuth')

// Login or Register the user
router.post('/login', authController.login);

router.post('/register', authController.register)

router.get('/me', authorizePlayer, authController.me)

module.exports = router;
