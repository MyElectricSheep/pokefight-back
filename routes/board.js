var express = require('express');
var router = express.Router();
const authorizePlayer = require('../middlewares/playerAuth')
const boardController = require('../controllers/boardController')

router.get('/all', boardController.find_all);

router.get('/ranking', boardController.get_ranking);

router.post('/save', authorizePlayer, boardController.create_one)

module.exports = router;
