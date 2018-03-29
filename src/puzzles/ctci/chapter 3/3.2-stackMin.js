const { Stack } = require('../../../structures');

// How would you design a stack which, in addition to push and pop, has a function min
// which returns the minimum element? Push, pop and min should all operate in 0(1) time.

// Ideas
// A) Implement stack as linked list (doubly linked) and track min node in addition to
//    the tail

// Clarification
// The min() func should be like peek() vs. pop(), that is it doesn't remove the
// value from the stack. Poorly worded question? (IMHO, it could've been better).
// Soooo....

// B) Implement a stack in a normal way, but add a second stack (minStack) to track
//    min values. On push, if value <= minStack.peek(), push value to minStack. On Pop,
//    if value === minStack.peek(), pop value from minStack.

class BStackMin {
  constructor() {
    this.storage = {};
    this.topOfStack = 0;
    this.minStack = new Stack();
  }

  get size() {
    return this.topOfStack;
  }

  push(value) {
    this.storage[this.topOfStack] = value;
    this.topOfStack++;

    if(this.minStack.size === 0 || value <= this.minStack.peek()) {
      this.minStack.push(value);
    }
  }

  pop() {
    if(this.topOfStack > 0) {
      this.topOfStack--;
      let value = this.storage[this.topOfStack];

      if(value === this.minStack.peek()) {
        this.minStack.pop();
      }

      return value;
    }
  }

  peek() {
    return this.storage[this.topOfStack - 1];
  }

  min() {
    return this.minStack.peek();
  }
}

class AStackMin {
  constructor() {
    this._tail = null;
    this._min = null;
  }

  push(value) {
    let newNode = new StackNode(value);

    if(!this._tail) {
      this._tail = newNode;
    } else {
      newNode.prev = this._tail;
      this._tail.next = newNode;
      this._tail = this._tail.next;
    }

    if(!this._min || this._min.value > this._tail.value) {
      this._min = this._tail;
    }
  }

  pop() {
    if(!this._tail) { return null; }

    let node = this._tail;
    let value = node.value;

    if(node.prev) {
      node.prev.next = null;
      this._tail = node.prev;
    }

    return value;
  }

  min() {
    if(!this._min) { return null; }

    let node = this._min;
    let { prev, next, value } = node;

    if(!prev && !next) { // only node
      this._tail = this._min = null;
    } else if(!next && prev) { // last node
      prev.next = null;
      this._tail = prev;
      this._min = null; // oops, how to update min (wouldn't be constant time)
    } else if(next && !prev) { // first node
      next.prev = null;
      this._min = null; // oops, how to update min (wouldn't be constant time)
    } else { // middle
      node.prev.next = node.next;
      node.next.prev = node.prev;
      this._min = null; // oops, how to update min (wouldn't be constant time)
    }

    return value;
  }

}

class StackNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

module.exports = {};


let stack = new BStackMin();
let nums = [7,9,5,3,9,0,3,8];

nums.forEach(n => stack.push(n));
nums.forEach(x => {
  console.log('');
  console.log(`stack.peek() -> ${stack.peek()}`);
  console.log(`stack.min() -> ${stack.min()}`);
  console.log(`stack.pop() -> ${stack.pop()}`);
});
