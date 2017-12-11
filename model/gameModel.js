function GameModel(gameDefaultSettings) {
    EventEmitter.call(this)
    this.score = 0;
    this.money = 50;
    this.water = 3;
    this.waterPrice = gameDefaultSettings;
    this.conso = gameDefaultSettings;
    let a = [];
    for (let i = 0; i < gameDefaultSettings.nbField; i++) {
        let field = new FieldModel(this.conso);
        a = [a, ...field];
    }   

    this.timer;
}

GameModel.prototype = Object.create(EventEmitter.prototype)

GameModel.prototype.addWater = function (n) {
    this.water += n;
    this.emit(DryfieldEvents.waterChanged, this.water);
}

GameModel.prototype.startGame = function () {
    clearInterval(this.timer);
    setInterval(1000, this.playTurn);
}

GameModel.prototype.playTurn = function () {
    fields.forEach( (field) => field.playTurn());
}
