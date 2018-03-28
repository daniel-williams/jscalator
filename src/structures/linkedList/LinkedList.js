class LinkedList {
  constructor() {
    this._head = null;
    this._count = 0;
  }

  get head() {
    return this._head;
  }
  set head(head) {
    this._head = head;
  }

  insert(data) {
    let newNode = new LinkedListNode(data);

    // special case: head node is null
    if(!this._head) {
      this.head = newNode;
    } else {
      let node = this.head;

      // find the last node in list
      while(node.next) {
        node = node.next;
      }

      // insert new node
      node.next = newNode;
    }

    this._count++;
  }

  insertAt(index, data) {
    if(index < 0 || index > this.size) {
      throw 'Insert index out of range.';
    }

    let newNode = new LinkedListNode(data);
    let node = this.head;
    let i = 0;

    // special case: insert at head node
    if(index === i) {
      newNode.next = this.head;
      this.head = newNode;
      this._count++;
    } else {
      // find node that preceeds insertion point
      while(index < ++i) {
        node = node.next;
      }

      // insert new node
      newNode.next = node.next;
      node.next = newNode;
      this._count++;
    }
  }

  remove(data) {
    let node = this.head;

    // special case: remove head node
    if(node.data === data) {
      this.head = node.next;
      this._count--;
    } else {
      while(node.next) {
        // find node immediately preceeding the node to remove
        if(node.next.data === data) {
          // reset next pointer to remove target node
          node.next = node.next.next;
          this._count--;
          break;
        }

        node = node.next;
      }
    }
  }

  removeAt(index) {
    // ensure index is valid
    if(index >= 0 && index < this.size) {
      let i = 0;

      // special case: remove head node
      if(i === index) {
        this.head = this.head.next;
      } else {
        let node = this.head;

        // find node immediately preceeding the node to remove
        while(++i < index) {
          node = node.next;
        }

        // reset next pointer to remove target node
        node.next = node.next.next;
      }
      this._count--;
    }
  }

  getElementAt(index) {
    if(index < 0 || index > this.size - 1) { return null; }

    let node = this.head;
    let i = 0;

    while(i < index) {
      node = node.next;
      i++;
    }

    return node;
  }

  toArray() {
    let result = [];
    let node = this.head;

    while(node) {
      result.push(node.data);
      node = node.next;
    }

    return result;
  }

  get size() {
    return this._count
  }
}

class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

const buildList = (chars) => {
  let list = new LinkedList();

  chars.split('').forEach(c => list.insert(c));

  return list;
}

function reverseIterative(list) {
  let node = list.head;
  let previous = null;

  while(node) {
    let save = node.next; // save next pointer (foward pointer)

    node.next = previous; // update next pointer (now points back)

    // advance to next position
    previous = node;
    node = save;
  }

  list.head = previous;
  return list;
}

function reverseRecursive(list) {
  list.head = helper(list.head);

  return list;

  function helper(node) {
    if(node === null || node.next === null) {
      return node; // end of list
    }

    let tail = helper(node.next);
    let save = node.next;

    node.next = null;
    save.next = node;

    return tail;
  }
}

module.exports = {
  buildList,
  LinkedList,
  LinkedListNode,
};
