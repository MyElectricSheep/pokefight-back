var express = require('express');
var router = express.Router();
const pokeController = require('../controllers/pokeController')

// Gives only one pokemon from the JSON thanks to its id 
// and retrieve only one information (name or type or base)
router.get('/:id/:info', pokeController.find_one_and_filter);

// Gives only one pokemon from the JSON thanks to its id
router.get('/:id', pokeController.find_one);

// Gives the complete list of pokemon from the JSON
router.get('/', pokeController.find_all);

module.exports = router;
