function GameController(gameView) {
    EventEmitter.call(this);
    this.gameView = gameView;
    this.gameModel = gameView.gameModel;

    gameView.on(DryfieldEvents.play, this.play.bind(this));
    gameView.on(DryfieldEvents.scores, this.scores.bind(this));
    gameView.on(DryfieldEvents.go, this.go.bind(this));
    gameView.on(DryfieldEvents.irrigate1, this.irrigate1.bind(this));
    gameView.on(DryfieldEvents.irrigate2, this.irrigate2.bind(this));
    gameView.on(DryfieldEvents.irrigate3, this.irrigate3.bind(this));
    gameView.on(DryfieldEvents.harvest1, this.harvest1.bind(this));
    gameView.on(DryfieldEvents.harvest2, this.harvest2.bind(this));
    gameView.on(DryfieldEvents.harvest3, this.harvest3.bind(this));
    gameView.on(DryfieldEvents.openBuyWater, this.openBuyWater.bind(this));
    gameView.on(DryfieldEvents.buyWater, this.buyWater.bind(this));
}

GameController.prototype = Object.create(EventEmitter.prototype)

GameController.prototype.startGame = function () {
   this.gameModel.startGame();
}

GameController.prototype.play = function () {
    document.getElementById('playButton').disabled = true;
    document.getElementById('scoresButton').disabled = false;
    document.getElementById('goButton').style.display = 'inline-block';
    document.getElementById('play').style.display = 'block';
    document.getElementById('scores').style.display = 'none';
}

GameController.prototype.scores = function () {
    document.getElementById('playButton').disabled = false;
    document.getElementById('scoresButton').disabled = true;
    document.getElementById('goButton').style.display = 'none';
    document.getElementById('play').style.display = 'none';
    document.getElementById('scores').style.display = 'block';
}

GameController.prototype.go = function () {
    document.getElementById('scoresButton').disabled = true;
    this.gameModel.startGame();
}

GameController.prototype.irrigate1 = function () {
    let qtyWater = parseInt(document.getElementById('qtyBuyWater').value);
    this.gameModel.addWater(qtyWater);
}

GameController.prototype.irrigate2 = function () {
    let qtyWater = parseInt(document.getElementById('qtyBuyWater').value);
    this.gameModel.addWater(qtyWater);
}
GameController.prototype.irrigate3 = function () {
    let qtyWater = parseInt(document.getElementById('qtyBuyWater').value);
    this.gameModel.addWater(qtyWater);
}

GameController.prototype.harvest1 = function () {
    let qtyWater = parseInt(document.getElementById('qtyBuyWater').value);
    this.gameModel.addWater(qtyWater);
}

GameController.prototype.harvest2 = function () {
    let qtyWater = parseInt(document.getElementById('qtyBuyWater').value);
    this.gameModel.addWater(qtyWater);
}

GameController.prototype.harvest3 = function () {
    let qtyWater = parseInt(document.getElementById('qtyBuyWater').value);
    this.gameModel.addWater(qtyWater);
}

GameController.prototype.openBuyWater = function () {
    let qtyWater = parseInt(document.getElementById('qtyBuyWater').value);
    this.gameModel.addWater(qtyWater);
}

GameController.prototype.buyWater = function () {
    let qtyWater = parseInt(document.getElementById('qtyBuyWater').value);
    this.gameModel.addWater(qtyWater);
}


