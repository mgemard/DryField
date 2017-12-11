function GameView(gameModel) {
    EventEmitter.call(this)
    this.gameModel = gameModel;

    this.initUI();

    gameModel.on(DryfieldEvents.waterChanged, this.refreshWater.bind(this));

    document.getElementById('playButton').addEventListener('click', () => {
        this.emit(DryfieldEvents.play);
    });

    document.getElementById('scoresButton').addEventListener('click', () => {
        this.emit(DryfieldEvents.scores);
    });

    document.getElementById('goButton').addEventListener('click', () => {
        this.emit(DryfieldEvents.go);
    });

    // irrigate
    document.getElementById('irrigate1').addEventListener('click', () => {
        this.emit(DryfieldEvents.irrigate1);
    });
    document.getElementById('irrigate2').addEventListener('click', () => {
        this.emit(DryfieldEvents.irrigate2);
    });
    document.getElementById('irrigate3').addEventListener('click', () => {
        this.emit(DryfieldEvents.irrigate3);
    });

    // harvest
    document.getElementById('harvest1').addEventListener('click', () => {
        this.emit(DryfieldEvents.harvest1);
    });

    document.getElementById('harvest2').addEventListener('click', () => {
        this.emit(DryfieldEvents.harvest2);
    });

    document.getElementById('harvest3').addEventListener('click', () => {
        this.emit(DryfieldEvents.harvest3);
    });

    // buy water
    document.getElementById('openBuyWater').addEventListener('click', () => {
        this.emit(DryfieldEvents.openBuyWater);
    });
    document.getElementById('buyWater').addEventListener('click', () => {
        this.emit(DryfieldEvents.buyWater);
    });
}

GameView.prototype.initUI = function () {
    const table = `<table id="tableField">
                        <tr>
                            <td>
                                <button id="irrigate1">Irrigate</button>
                            </td>
                            <td>
                                <button id="irrigate2">Irrigate</button>
                            </td>
                            <td>
                                <button id="irrigate3">Irrigate</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id="waterChamp1">3 L</div>
                            </td>
                            <td>
                                <div id="waterChamp2">3 L</div>
                            </td>
                            <td>
                                <div id="waterChamp3">3 L</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button id="harvest1">Harvest</button>
                            </td>
                            <td>
                                <button id="harvest2">Harvest</button>
                            </td>
                            <td>
                                <button id="harvest3">Harvest</button>
                            </td>
                        </tr>
                    </table>`;

    document.getElementById('tableField').innerHTML = table;
}

GameView.prototype = Object.create(EventEmitter.prototype)

GameView.prototype.refreshWater = function (d) {
    document.getElementById('water').innerHTML = this.gameModel.water + " L";
}



