function FieldModel(fieldWaterInit, conso) {
    this.water = fieldWaterInit;
    this.progress = 0;
    this.conso = conso;
}

FieldModel.prototype.playTurn = function () {
    this.progress += 0.05;
    this.progress = Math.max(this.progress);
    this.water -= this.conso;
}

FieldModel.prototype.setConso = function () {

}

FieldModel.prototype.irrigate = function () {
    if (this.water > 0 && this.progress < 1) {
        this.water += this.conso;
    }
}

FieldModel.prototype.harvest = function () {
    this.progres = 0;

}
