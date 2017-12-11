function SoundController() {
    EventEmitter.call(this);
    this.score = 0;
    this.money = 50;
    this.water = 0;
}

SoundController.prototype = Object.create(EventEmitter.prototype)

SoundController.prototype.setWater = function (n) {
    this.water = n;
    this.notify('set water', this.water);
}

SoundController.prototype.getWater = function (n) {
    return this.water;
}
