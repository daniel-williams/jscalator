const { Stack } = require('../../../structures');

// Implement a MyQueue class which implements a queue using two stacks

// Ideas
// A) Enqueue would push items to the first stack (inStack). Dequeue would check
//    a second stack (outStack), if empty, pop all items from inStack and push
//    to outStack, then pop from outStack.

class MyQueue {
  constructor() {
    this.inStack = new Stack();
    this.outStack = new Stack();
  }

  enqueue(value) {
    this.inStack.push(value);
  }

  dequeue() {
    if(this.outStack.size === 0) {
      while(this.inStack.size > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }

    return this.outStack.pop();
  }
}

module.exports = {};


let q = new MyQueue();
let nums = new Array(5).fill(0).map((x, i) => i + 1);

nums.forEach(n => q.enqueue(n));
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.dequeue());
nums.forEach(n => q.enqueue(n * 10));
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.dequeue());
