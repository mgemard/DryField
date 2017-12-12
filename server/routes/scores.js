var express = require('express');
var router = express.Router();
var scoresController = require('../controllers/scoresController');

router.get('/', scoresController.findScores);

router.post('/', scoresController.addScore);


module.exports = router;
