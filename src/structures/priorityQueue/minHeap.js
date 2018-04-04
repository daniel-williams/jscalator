const { Queue } = require('../queue');


class MinHeap {
  constructor(a = []) {
    this.heap = [];

    a.forEach(val => this.insert(val));
  }

  insert(val) {
    this.heap.push(val);

    let i = this.heap.length - 1;

    while(true) {
      if(i === 0) { break; }

      let p = this.parentIndex(i);

      if(this.heap[i] > this.heap[p]) {
        break;
      }

      this.swap(i, p);
      i = p;
    }
  }

  extractMin() {
    if(!this.heap.length) { return null; }

    let lastIndex = this.heap.length - 1;
    let lastValue = this.heap[lastIndex];
    let minValue = this.heap[0];

    this.heap.splice(lastIndex, 1);
    this.heap[0] = lastValue;
    this.heapify(0);

    return minValue;
  }

  heapify(index) {
    if(index >= this.heap.length) { return; }

    let value = this.heap[index];
    let leftIndex = this.leftIndex(index);
    let leftValue = this.heap[leftIndex];
    let rightIndex = this.rightIndex(index);
    let rightValue = this.heap[rightIndex];
    let childIndex;

    if(leftValue == null) { return; }

    // find child index with smallest value
    if(rightValue != null) {
      childIndex = rightValue < leftValue ? rightIndex : leftIndex;
    } else {
      childIndex = leftIndex;
    }

    // determine if a swap is needed
    if(this.heap[index] > this.heap[childIndex]) {
      this.swap(index, childIndex);
      // call heapify on child node
      this.heapify(childIndex);
    }
  }

  swap(i, j) {
    let temp = this.heap[i];

    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  parentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  leftIndex(i) {
    return i * 2 + 1;
  }

  rightIndex(i) {
    return i * 2 + 2;
  }

  print() {
    console.log(`heap state -> [${this.heap.join(',')}]`);
    console.log(`is min heap? -> ${this.isMinHeap()}`);
  }

  toArray() {
    return this.heap;
  }

  isMinHeap() {
    if(!this.heap.length) { return true; }

    let q = new Queue();

    q.enqueue(0); // enqueue root index

    while(q.size) {
      let index = q.dequeue();
      let leftIndex = this.leftIndex(index);
      let rightIndex = leftIndex + 1;

      if(this.heap[leftIndex] != null) {
        if(this.heap[index] > this.heap[leftIndex]) {
          return false;
        }
        q.enqueue(leftIndex);
      }

      if(this.heap[rightIndex] != null) {
        if(this.heap[index] > this.heap[rightIndex]) {
          return false;
        }
        q.enqueue(rightIndex);
      }
    }

    return true;
  }
};


// const nums = [7, 13, 51, 10, 45, 4, 42, 60];
// const inserts = [23,87,49,4];

// let heap = new MinHeap(nums);

// console.log('');
// console.log(`init heap with [${nums.join(',')}]`);
// heap.print();

// console.log('');
// inserts.forEach(n => heap.insert(n));
// console.log(`${inserts.length} inserts -> [${inserts.join(',')}]`);
// heap.print();

// let extracts = new Array(3).fill(null).map(() => heap.extractMin());
// console.log('');
// console.log(`extract min ${extracts.length} times -> [${extracts.join(',')}]`);
// heap.print();
