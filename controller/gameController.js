function GameController(gameView) {
    EventEmitter.call(this);
    this.gameView = gameView;
    this.gameModel = gameView.gameModel;

    gameView.on(DryfieldEvents.play, this.play.bind(this));
    gameView.on(DryfieldEvents.scores, this.scores.bind(this));
    gameView.on(DryfieldEvents.go, this.go.bind(this));
    gameView.on(DryfieldEvents.irrigate, this.irrigate.bind(this));
    gameView.on(DryfieldEvents.harvest, this.harvest.bind(this));
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

    this.getScores();

}

GameController.prototype.getScores = function () {
    // Make a request for a user with a given ID
    axios.get(this.gameModel.webService)
        .then(function (response) {
            let list = response.data.list;
            const tableBegin = `<table><tr><th>Name</th><th>Score</th></tr><tr>`;
            const tr = `</tr><tr>`;
            const tableEnd = `</tr ></table >`;
            let row = "";

            console.log(list);
            for (let i = 0; i < list.length; i++) {
                let player = list[i];
                console.log(player);
                row += `<tr><td>${player.name}</td><td>${player.score}</td></tr>`;
            }

            let table = tableBegin + row + tableEnd;
            console.log(table);
            document.getElementById('scores').innerHTML = table;
        })
        .catch(function (error) {
            console.log(error);
        });
}

//     <table>
//     <tr>
//         <th>Player</th>
//         <th>Harvest count</th>
//     </tr>
//     <tr>
//         <td id="joueur1"></td>
//         <td id="nbHarvest1"></td>
//     </tr>
//     <tr>
//         <td id="joueur2"></td>
//         <td id="nbHarvest2"></td>
//     </tr>
//     <tr>
//         <td id="joueur3"></td>
//         <td id="nbHarvest3"></td>
//     </tr>
//     <tr>
//         <td id="joueur4"></td>
//         <td id="nbHarvest4"></td>
//     </tr>
// </table>

GameController.prototype.go = function () {
    document.getElementById('scoresButton').disabled = true;
    document.getElementById('goButton').disabled = true;
    this.gameModel.startGame();
}

GameController.prototype.irrigate = function (field) {
    this.gameModel.irrigate(field);
}

GameController.prototype.harvest = function (field) {
    this.gameModel.harvest(field);

}

GameController.prototype.openBuyWater = function () {
    this.gameModel.openBuyWater();
}

GameController.prototype.buyWater = function () {
    let qtyWater = parseInt(document.getElementById('qtyBuyWater').value);
    this.gameModel.buyWater(qtyWater);
}

GameController.prototype.forceRefresh = function () {
    this.gameView.initUI();
}

