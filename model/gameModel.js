function GameModel(gameDefaultSettings) {
    EventEmitter.call(this)
    this.score = 0;
    this.money = 50;
    this.water = 3;
    [this.waterPrice, this.conso] = gameDefaultSettings;
    this.fields = [new FieldModel(this.conso), new FieldModel(this.conso), new FieldModel(this.conso)];
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

GameModel.prototypeplayTurn() = function () {
    fields.forEach( (field) => field.playTurn());
}

