class HashTable {
  constructor(size) {
    this._table = new Array(size).fill(undefined);
  }

  getHashIndex(key) {
    let hash = 0;

    for(let i = 0; i < key.length; i += 4) {
      let val = 0;

      for(let j = 3; j >= 0; j--) {
        let code = key.charCodeAt(i + j);

        if(!isNaN(code)) {
          let tmp = code * Math.pow(1000, j);
          val += tmp;
        }
      }
      hash += val;
    }

    return hash % this._table.length;
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
}