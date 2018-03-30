class Queue {
  constructor() {
    this._lowIndex = 0;
    this._highIndex = 0;
    this._storage = {};
  }

  get size() {
    return this._highIndex - this._lowIndex;
  }

  enqueue(value) {
    this._storage[this._highIndex] = value;
    this._highIndex++;
  }

  dequeue() {
    if(this.size > 0) {
      let value = this._storage[this._lowIndex];

      delete this._storage[this._lowIndex];

      this._lowIndex++;

      return value;
    }
  }

  peek() {
    return this._storage[this._lowIndex];
  }
}

module.exports = {
  Queue,
};
