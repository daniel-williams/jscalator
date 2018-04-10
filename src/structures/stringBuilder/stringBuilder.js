class StringBuilder {
  constructor() {
    this.items = [];
  }

  append(chars) {
    this.items.push(new StringBuilderItem(chars));
  }

  appendLine(chars) {
    this.items.push(new StringBuilderItem(chars, true));
  }

  toString() {
    return this.items.reduce((accum, item) => {
      return accum + (item.isLine ? item.chars + '\r\n' : item.chars);
    }, '');
  }
}

class StringBuilderItem {
  constructor(chars = '', isLine = false) {
    this.chars = chars;
    this.isLine = isLine;
  }
}

module.exports = {
  StringBuilder,
};
