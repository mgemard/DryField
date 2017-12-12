function SoundController() {
    EventEmitter.call(this);
    this.score = 0;
    this.money = 50;
    this.water = 0;
}

SoundController.prototype = Object.create(EventEmitter.prototype)

SoundController.prototype.init = function (gameView) {
    this.gameView = gameView;
    this.game = gameView.gameModel;
    this.fields = gameView.fields;

    this.harvestSound = new Audio('public/sounds/money.wav');
    this.growSound = new Audio('public/sounds/field.wav');

    this.gameView.on('harvest', this.playHarvestSound.bind(this));
    this.gameView.on('endGrowth', this.playGrowthEnd.bind(this));

}

SoundController.prototype.playHarvestSound = function () {
    this.harvestSound.play();
}

SoundController.prototype.playGrowthEnd = function () {
    this.growthEndSound.play();
}
