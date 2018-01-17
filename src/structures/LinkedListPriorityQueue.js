class LinkedListPriorityQueue {
  constructor(a = []) {
    this.first = null;

    a.forEach(x => this.insert(x));
  }

  insert(v, p) {
    const newNode = new Node(v, p || v);

    // 1. first node is null (set new as first)
    // 2. first node has lower priority (swap new with first, link first as next node)
    // 3. walk list, find where next node is null or has lower priority, insert new node
    if(!this.first || this.first.priority < newNode.priority) {
      newNode.next = this.first;
      this.first = newNode;
    } else {
      let pointer = this.first;

      while(pointer.next && pointer.next.priority >= newNode.priority) {
        pointer = pointer.next;
      }

      newNode.next = pointer.next;
      pointer.next = newNode;
    }
  }

  extractMax() {
    let result = this.first;

    this.first = this.first
      ? this.first.next
      : null;

    return result
      ? { value: result.value, priority: result.priority}
      : null;
  }

  toArray() {
    let result = [];
    let node = this.first;

    while(node) {
      result.push({value: node.value, priority: node.priority});
      node = node.next;
    }

    return result;
  }
}

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
    this.next = null;
  }
}

module.exports = {
  LinkedListPriorityQueue,
};
