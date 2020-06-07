var express = require('express');
var router = express.Router();
const pokeController = require('../controllers/pokeController')

// Create a GET route on /pokemon which gives the complete list of pokemon from the JSON
// Create a GET route on /pokemon/:id which gives only on pokemon from the JSON thanks to its id
// Create a GET route on /pokemon/:id/:info(name|type|base) which gives only on pokemon from the JSON thanks to its id and retrieve only one information (name or type or base)

router.get('/:id/:info', pokeController.find_one_and_filter);

router.get('/:id', pokeController.find_one);

router.get('/', pokeController.find_all);


module.exports = router;
