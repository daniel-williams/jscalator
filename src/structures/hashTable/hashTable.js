class HashTable {
  constructor(size = 10) {
    this._count = 0;
    this._table = new Array(size).fill(null);
  }

  insert(key, data) {
    if(this._count > this._table.length * 0.7) {
      this.expand();
    }

    let index = this.getIndex(key);
    let newNode = new HashNode(key, data);

    if(!this._table[index]) {
      this._table[index] = newNode;
    } else {
      let node = this._table[index];

      while(node.next) {
        node = node.next;
      }

      node.next = newNode;
    }

    this._count++;
  }

  delete(key) {
    let index = this.getIndex(key);
    let node = this._table[index];

    if(!node) { return; }

    if(node.key === key) {
      this._table[index] = node.next;
    } else {
      while(node.next) {
        if(node.next.key === key) {
          node.next = node.next.next;
        }
        node = node.next;
      }
    }
  }

  search(key) {
    let index = this.getIndex(key);
    let node = this._table[index];

    while(node) {
      if(node.key === key) {
        break;
      }

      node = node.next;
    }

    return node;
  }

  expand() {
    // academic... as JavaScript arrays are already dynamic
    let oldTable = this._table;

    this._table = new Array(this._table.length * 2).fill(null);
    this._count = 0;

    for(const item of oldTable) {
      let node = item;

      while(node) {
        this.insert(node.key, node.value);
        node = node.next;
      }
    }
  }

  getIndex(key) {
    return Math.abs(this.getHash(key)) % this._table.length;
  }

  getHash(key) {
    for(var hash = 0, i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash &= hash;
    }

    return hash;
  }

}

class HashNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}


module.exports = {
  HashTable,
};
