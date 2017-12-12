function DefaultController(){

}

DefaultController.prototype.index = function(req, res, next) {
  res.json({});
};

module.exports = new DefaultController();