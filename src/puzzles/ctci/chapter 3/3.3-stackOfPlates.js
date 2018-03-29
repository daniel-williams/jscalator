// Imagine a (literal) stack of plates. If the stack gets too high, it might topple.
// Therefore, in real life, we would likely start a new stack when the previous stack exceeds some
// threshold. Implement a data structure SetOfStacks that mimics this. SetOfStacks should be
// composed of several stacks and should create a new stack once the previous one exceeds capacity.
// SetOfStacks. push() and SetOfStacks. pop() should behave identically to a single stack
// (that is, pop () should return the same values as it would if there were just a single stack).

// Follow Up
// Implement a function popAt(int index) which performs a pop operation on a specific sub
// stack.

// Ideas
// A) Implement as an array of stacks, which each stack having a max capacity and isFull() method

class ASetOfStacks {
  constructor(capacity) {
    this.capacity = capacity;
    this.storage = []; // storage for all stacks
    this.storageIndex = 0; // to track "working" stack

    // init are first stack
    this.storage[0] = new MaxCapacityStack(this.capacity);
  }

  push(value) {
    let stack = this.storage[this.storageIndex];

    if(stack.isFull()) {
      this.storageIndex++;
      stack = this.storage[this.storageIndex] = new MaxCapacityStack(this.capacity);
    }

    stack.push(value);
  }

  pop() {
    let stack = this.storage[this.storageIndex];

    // gaurd against all stacks being empty
    if(!stack.isEmpty()) {
      let value = stack.pop();

      if(stack.isEmpty() && this.storageIndex > 0) {
        delete this.storage[this.storageIndex];
        this.storageIndex--;
      }

      return value;
    }

    return null;
  }

  popAt(index) {
    if(index < 0 || index > this.storageIndex) { return null; }

    let stack = this.storage[index];

    if(stack.isEmpty()) { return null; }

    let value = stack.pop();

    // if we emptied a stack, delete it and shift remaining stacks
    if(stack.isEmpty()) {
      // shift stacks
      for(let i = index + 1; i < this.storage.length; i++) {
        this.storage[i - 1] = this.storage[i];
      }
      // delete last storage position
      delete this.storage[this.storage.length - 1];
      this.storageIndex--;
    }

    return value;
  }
}

class MaxCapacityStack {
  constructor(maxCapacity) {
    this.maxCapacity = maxCapacity;
    this.storage = {};
    this.topOfStack = 0;
  }

  push(value) {
    if(this.topOfStack >= this.maxCapacity) {
      throw `Stack is full`;
    }

    this.storage[this.topOfStack] = value;
    this.topOfStack++;
  }

  pop() {
    if(this.topOfStack > 0) {
      this.topOfStack--;

      let value = this.storage[this.topOfStack];

      delete this.storage[this.topOfStack];

      return value;
    }
  }

  isFull() {
    return this.topOfStack >= this.maxCapacity;
  }

  isEmpty() {
    return this.topOfStack === 0;
  }
}

module.exports = {};


// testing
let stackSet = new ASetOfStacks(5);
let nums = new Array(25).fill(0).map((x, i) => i);

nums.forEach(n => stackSet.push(n));

for(let i = 0; i < 7; i++) {
  console.log(stackSet.pop());
}

for(let i = 0; i < 7; i++) {
  console.log(stackSet.popAt(0));
}

for(let i = 0; i < 11; i++) {
  console.log(stackSet.pop());
}
