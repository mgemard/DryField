var scores = require('../models/scores.js');

function ScoresController(){

}

ScoresController.prototype.findScores = function(req, res, next) {
  res.json({ status: 'OK', list: scores.list});
};

ScoresController.prototype.addScore = function(req, res, next) {
  if (typeof req.body.name !== 'undefined' && typeof req.body.score !==
      'undefined') {
    scores.add(req.body);
    res.json({ status: 'OK', list: scores.list});
  } else {
    res.json({ status: 'KO' });
  }
};

module.exports = new ScoresController();