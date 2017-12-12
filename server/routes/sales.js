var express = require('express');
var router = express.Router();
var salesController = require('../controllers/salesController');

router.get('/', salesController.index);

router.get('/stock', salesController.findStock);

router.get('/currency', salesController.findCurrency);

router.post('/sell', salesController.sell);

router.post('/buy', salesController.buy);

module.exports = router;