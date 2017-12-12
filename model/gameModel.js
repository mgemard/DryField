function GameModel(gameDefaultSettings) {
    EventEmitter.call(this)
    this.score = 0;
    this.money = 50;
    this.water = gameDefaultSettings.waterInit;
    this.waterPrice = gameDefaultSettings.waterPrice;
    this.conso = gameDefaultSettings.conso;
    this.fieldWaterInit = gameDefaultSettings.fieldWaterInit;
    this.waterInit = gameDefaultSettings.waterInit;
    this.fields = [];
    for (let i = 0; i < gameDefaultSettings.nbField; i++) {
        let field = new FieldModel(this.fieldWaterInit, this.conso);
        this.fields.push(field);
    }
    this.timer;
    this.interval = gameDefaultSettings.interval;
    this.pause = false;
    this.webService = gameDefaultSettings.webService;
}

GameModel.prototype = Object.create(EventEmitter.prototype)

GameModel.prototype.irrigate = function (n) {
    let field = this.fields[n];
    if (this.water > 0) {
        field.water += field.conso;
        this.water--;
    }
    this.emit(DryfieldEvents.waterChanged);
    this.emit(DryfieldEvents.progressChanged);
}

GameModel.prototype.harvest = function (n) {
    this.fields[n].progress = 0;
    this.score++;
    this.emit(DryfieldEvents.scoreChanged);
    this.emit(DryfieldEvents.progressChanged);
}

GameModel.prototype.startGame = function () {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.playTurn(), this.interval);
}

GameModel.prototype.playTurn = function () {
    if (!this.pause) {
        // if (this.money === 0 && this.water === 0 && this.noFieldsToCollect()) {
        if (this.noFieldsToCollect()) {
            this.gameOver();
        }
        this.fields.forEach((field) => {
            if (field.progress < 1 && field.water > 0) {
                field.progress += 0.05;
                field.progress = Math.min(field.progress, 1);
                field.water--;
            } else if (field.water == 0) {
                field.progress = 0;
            }
        });
        this.emit(DryfieldEvents.waterChanged);
        this.emit(DryfieldEvents.progressChanged);
    }
}

GameModel.prototype.openBuyWater = function () {
    this.pause = true;
    this.emit(DryfieldEvents.openBuyWater);
}

GameModel.prototype.buyWater = function (n) {
    this.pause = false;
    this.water += n;
    this.money -= this.waterPrice;
    this.emit(DryfieldEvents.hideBuyWater);
    this.emit(DryfieldEvents.moneyChanged);
    this.emit(DryfieldEvents.waterChanged);
}

GameModel.prototype.noFieldsToCollect = function (n) {
    return this.fields.filter(field => field.water != 0).length === 0;
}

GameModel.prototype.gameOver = function (n) {
    clearInterval(this.timer);
    console.log("Game over!");

    axios.post(this.webService, {
        name: this.name,
        score: this.score
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });



}
