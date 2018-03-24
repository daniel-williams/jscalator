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
    let newNode = new Node(data);

    // special case: head node is null
    if(!this._head) {
      this._head = newNode;
    } else {
      let node = this._head;

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

    let newNode = new Node(data);
    let node = this._head;
    let i = 0;

    // special case: insert at head node
    if(index === i) {
      newNode.next = this._head;
      this._head = newNode;
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
    let node = this._head;

    // special case: remove head node
    if(node.data === data) {
      this._head = node.next;
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
        this._head = this._head.next;
      } else {
        let node = this._head;

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

  toArray() {
    let result = [];
    let node = this._head;

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

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
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

const ll = new LinkedList();
ll.insert('lacey');
ll.insert('daniel');
ll.insert('lexus');
ll.insert('manly');

// reverseIterative(ll);
reverseRecursive(ll);

module.exports = {
  LinkedList,
};
