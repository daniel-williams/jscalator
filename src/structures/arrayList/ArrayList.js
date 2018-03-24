class ArrayList {
  constructor() {
    this._items = new Array(2).fill(null);
    this._count = 0;
  }

  insert(item) {
    if(this._count === this._items.length) {
      this.expand();
    }

    this._items[this._count++] = item;
  }

  expand() {
    let newCount = this._items.length * 2;
    let oldItems = this._items;

    this._items = new Array(newCount).fill(null);
    oldItems.forEach((item, i) => this._items[i] = item);
  }

  toArray() {
    return this._items.slice(0, this._count);
  }
}


let list = new ArrayList();

console.log('empty -> ', list.toArray());

list.insert('daniel');
list.insert('lacey');
list.insert('lexus');
list.insert('manly');
list.insert('master chief');

console.log('items -> ', list.toArray());