function GameView(gameModel) {
    EventEmitter.call(this)
    this.gameModel = gameModel;

    gameModel.on(DryfieldEvents.scoreChanged, this.scoreChanged.bind(this));
    gameModel.on(DryfieldEvents.moneyChanged, this.moneyChanged.bind(this));
    gameModel.on(DryfieldEvents.waterChanged, this.waterChanged.bind(this));
    gameModel.on(DryfieldEvents.progressChanged, this.progressChanged.bind(this));
    gameModel.on(DryfieldEvents.openBuyWater, this.openBuyWater.bind(this));
    gameModel.on(DryfieldEvents.hideBuyWater, this.hideBuyWater.bind(this));

}

GameView.prototype = Object.create(EventEmitter.prototype)

GameView.prototype.scoreChanged = function (d) {
    document.getElementById('score').innerHTML = this.gameModel.score + " harvests";
}

GameView.prototype.moneyChanged = function (d) {
    document.getElementById('money').innerHTML = this.gameModel.money + " $";
}

GameView.prototype.waterChanged = function (d) {
    document.getElementById('water').innerHTML = this.gameModel.water + " L";

    for (let i = 0; i < this.gameModel.fields.length; i++) {
        document.getElementById('waterField' + i).innerHTML = this.gameModel.fields[i].water + " L";
        if (this.gameModel.water > 0 || this.gameModel.progress == 1) {
            document.getElementById('irrigate' + i).disabled = false;
        } else  {
            document.getElementById('irrigate' + i).disabled = true;
        }
    }
}

GameView.prototype.progressChanged = function (d) {
    for (let i = 0; i < this.gameModel.fields.length; i++) {
        document.getElementById('progressField' + i).innerHTML = parseInt(100 * this.gameModel.fields[i].progress) + " %";
        console.log(this.gameModel.fields[i].progress);
        if (this.gameModel.fields[i].progress == 1 ) {
            document.getElementById('harvest' + i).disabled = false;
        } else {
            document.getElementById('harvest' + i).disabled = true;
        }
    }
}

GameView.prototype.openBuyWater = function (d) {
    document.getElementById('openBuyWater').disabled = true;
    document.getElementById('buyWaterPopup').style.display = 'inline-block';
}

GameView.prototype.hideBuyWater = function (d) {
    document.getElementById('openBuyWater').disabled = false;
    document.getElementById('buyWaterPopup').style.display = 'none';
    document.getElementById('water').innerHTML = this.gameModel.water + " L";
}

GameView.prototype.initUI = function () {
    const tableBegin = `<table id="tableField"><tr>`;
    const tr = `</tr><tr>`;
    const tableEnd = `</tr ></table >`;
    let irrigate = "", field = "", progress = "", harvest = "";

    for (let i = 0; i < this.gameModel.fields.length; i++) {
        irrigate += `<td><button id="irrigate${i}" ${this.gameModel.water > 0 ? "" : "disabled"}>Irrigate</button></td>`;
        progress += `<td><div id="progressField${i}">0 %</div></td>`;
        field += `<td><div id="waterField${i}">${this.gameModel.fieldWaterInit} L</div></td>`;
        harvest += `<td><button id="harvest${i}" ${this.gameModel.fields[i].progres == 1 ? "" : "disabled"}>Harvest</button></td>`;
    }

    let table = tableBegin + irrigate + tr + progress + tr + field + tr + harvest + tableEnd;

    document.getElementById('score').innerHTML = this.gameModel.score + " harvests";
    document.getElementById('money').innerHTML = this.gameModel.money + " $";
    document.getElementById('water').innerHTML = this.gameModel.water + " L";

    document.getElementById('tableField').innerHTML = table;

    document.getElementById('playButton').addEventListener('click', () => {
        this.emit(DryfieldEvents.play);
    });

    document.getElementById('scoresButton').addEventListener('click', () => {
        this.emit(DryfieldEvents.scores);
    });

    document.getElementById('goButton').addEventListener('click', () => {
        document.getElementById('play').style.display = 'block';
        this.emit(DryfieldEvents.go);
    });

    for (let i = 0; i < this.gameModel.fields.length; i++) {
        // irrigate
        document.getElementById('irrigate' + i).addEventListener('click', () => {
            this.emit(DryfieldEvents.irrigate, i);
        });
        // harvest
        document.getElementById('harvest' + i).addEventListener('click', () => {
            this.emit(DryfieldEvents.harvest, i);
        });
    }

    // buy water
    document.getElementById('openBuyWater').addEventListener('click', () => {
        this.emit(DryfieldEvents.openBuyWater);
    });
    document.getElementById('buyWater').addEventListener('click', () => {
        this.emit(DryfieldEvents.buyWater);
    });
}
