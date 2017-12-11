// Observable.js => fonction de constructeur
function Observable() {
    this.observers = [];
}

// Add an observer to the list
Observable.prototype.addObserver = function(observer) {
    this.observers.push(observer);
};

// Remove an observer to the list
Observable.prototype.removeObserver = function(observer) {
    var idx = this.observers.indexOf(observer);
    // retourne -1 si absent sinon renvoi l'indice de la position
    if (idx !== -1) {
        this.observers.splice(idx, 1);
    }
};

// Call the update function of all the observers
Observable.prototype.notify = function(label, obj) {
    this.observers.forEach(function(elem) {
        elem.update.call(elem, label, obj);
    });
};