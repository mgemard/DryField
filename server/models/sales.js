function Sales() {
  this.list = [];
  this.stock = 10000;
  this.buyingPrice = 1;
  // this.sellingPrice = 5% * this.buyingPrice;
  this.updatePrice();

  this.updates = [
    0, 0, -3, 4, 6, 0, -1, 0, 1, 0,
    -2, 1, 1, 2, 3, 0, 1, 0, 0, 0,
    1, 0
  ];

  this.init();
}

Sales.prototype.getStock = function () {
  return this.stock;
};

Sales.prototype.getPrices = function () {
  return { sales: this.buyingPrice, purchase: this.sellingPrice };
};

Sales.prototype.updatePrice = function (cmd) {
  if (cmd === 'sale') {
    this.buyingPrice = (this.buyingPrice * 95 / 100) + 0.01;
  } else if (cmd === 'purchase') {
    this.buyingPrice = (this.buyingPrice * 104 / 100) + 0.01;
  }
  this.sellingPrice = this.buyingPrice * 105 /100;
  this._capPrices();
  console.log('Prices changed: ', {buy: this.buyingPrice, sell: this.sellingPrice});
};

Sales.prototype.init = function() {
  setInterval(function () {
    var rNbr = ~~(Math.random() * this.updates.length);
    this.buyingPrice += this.buyingPrice * this.updates[rNbr] / 100;
    this._capPrices();
    this.updatePrice();
  }.bind(this), 10000);
};

Sales.prototype._capPrices = function(){
  if (this.buyingPrice > 2) {
    this.buyingPrice = 2;
  } else if (this.buyingPrice < 0.1) {
    this.buyingPrice = 0.1;
  }
};

Sales.prototype.sell = function(amount) {
  this.stock += parseInt(amount);
  this.list.push({
    amount: amount,
    price: this.buyingPrice,
    type: 'sale',
    timestamp: new Date()
  });
  this.truncate();
  var res = amount * this.buyingPrice;
  this.updatePrice('sale');
  return res;
};

Sales.prototype.buy = function(amount) {
  if (amount <= this.stock) {
    this.stock -= parseInt(amount);
    this.list.push({
      amount: amount,
      price: this.sellingPrice,
      type: 'purchase',
      timestamp: new Date()
    });
    this.truncate();
    var res = amount * this.sellingPrice;
    this.updatePrice('purchase');
    return res;
  }
  return false;
};

Sales.prototype.truncate = function () {
  if (this.list.length > 20) {
    this.list = this.list.slice(this.list.length - 10);
  }
};
  
module.exports = new Sales();
