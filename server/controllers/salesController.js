var sales = require('../models/sales.js');

function SalesController(){

}

SalesController.prototype.index = function(req, res, next) {
  res.json({ status: 'OK', list: sales.list});
};

SalesController.prototype.findStock = function(req, res, next) {
  res.json({ status: 'OK', stock: sales.getStock() });
};

SalesController.prototype.findCurrency = function(req, res, next) {
  res.json({ status: 'OK', currencies: sales.getPrices()});
};

SalesController.prototype.sell = function (req, res, next) {
  if (typeof req.body.amount !== undefined) {
    var amount = sales.sell(req.body.amount);
    res.json({ status: 'OK', gain: amount });
  } else {
    res.json({ status: 'KO' });
  }
};

SalesController.prototype.buy = function (req, res, next) {
  if (typeof req.body.amount !== undefined) {
    var amount = sales.buy(req.body.amount);
    if (amount !== false) {
      res.json({ status: 'OK', cost: amount });
    } else {
      res.json({ status: 'KO' }); 
    }
  } else {
    res.json({ status: 'KO' });
  }
};

module.exports = new SalesController();