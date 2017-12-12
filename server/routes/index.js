var express = require('express');
var router = express.Router();
var defaultController = require('../controllers/defaultController');

/* GET home page. */
router.get('/', defaultController.index);

module.exports = router;