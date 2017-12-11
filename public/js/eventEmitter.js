// eventEmitter.js
function EventEmitter() {
  this.events = {};// associative array : event => functions to call
}
// Add a function to the event
EventEmitter.prototype.on = function (eventName, fn) {
  this.events[eventName] = this.events[eventName] || [];
  this.events[eventName].push(fn);
};
// Remove a function to the event
EventEmitter.prototype.off = function (eventName, fn) {
  if (this.events[eventName]) {
    for (varii = 0; ii < this.events[eventName].length; ii++) {
      if (this.events[eventName][ii] === fn) {
        this.events[eventName].splice(ii, 1);
        break;
      }
    }
  }
};

EventEmitter.prototype.emit = function (eventName, data) {
  if (this.events[eventName]) {
    this.events[eventName].forEach(function (fn) {
      fn(data);
    });
  }
};