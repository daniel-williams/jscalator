class Stack {
  constructor() {
    this._size = 0;
    this._storage = {};
  }

  get size() {
    return this._size;
  }

  pop() {
    if(this._size > 0) {
      this._size--;

      let value = this._storage[this._size];

      delete this._storage[this._size];

      return value;
    }
  }

  push(value) {
    this._storage[this._size] = value;
    this._size++;
  }

  peek() {
    return this._storage[this._size - 1];
  }
}

module.exports = {
  Stack,
};
