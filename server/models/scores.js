function Scores() {
  this.list = [];
}

Scores.prototype.add = function(obj) {
  this.list.push({
    name: obj.name,
    score: obj.score
  });
  this.list.sort(function (e1, e2) {
    return e2.score - e1.score;
  });
};

module.exports = new Scores();