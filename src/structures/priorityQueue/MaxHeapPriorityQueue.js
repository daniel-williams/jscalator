/*

using a "complete" binary tree (i.e., full expect for lowest level, which fills left to right)
where array index is x
root node: x = 0;

    0
  1   2
 3 4 5 6

a node's left child is at = (2x + 1)
a node's right child is at = (2x + 2)
a child's parent is at = Math.floor((x - 1) / 2)

*/
class MaxHeapPriorityQueue {
  constructor(a = []) {
    this.heap = [];

    a.forEach(x => this.insert(x));
  }

  insert(v, p) {
    this.heap.push(new Node(v, p || v));

    let nodeIndex = this.heap.length - 1;
    let nodeParentIndex = getParentIndex(nodeIndex);

    while(nodeParentIndex >= 0 && this.heap[nodeIndex].priority > this.heap[nodeParentIndex].priority) {
      this.swap(nodeIndex, nodeParentIndex);

      nodeIndex = nodeParentIndex;
      nodeParentIndex = getParentIndex(nodeParentIndex);
    }
  }

  toArray() {
    return this.heap;
  }

  count() {
    return this.heap.length;
  }

  extractMax() {
    let count = this.count();
    let result = count ? this.heap[0] : null;

    this.heap = count > 1
      ? [this.heap[count - 1], ...this.heap.slice(1, -1)]
      : [];

    this.heapify();

    return result;
  }

  heapify(index = 0) {
    if(!this.heap[index]) { return; }

    let { priority } = this.heap[index];
    let leftIndex = index * 2 + 1;
    let rightIndex = leftIndex + 1;

    while(this.heap[leftIndex] != undefined) {
      if(this.heap[rightIndex] != undefined
        && this.heap[rightIndex].priority > this.heap[leftIndex].priority
        && this.heap[rightIndex].priority > priority) {
        this.swap(index, rightIndex);
        index = rightIndex;
      } else if(this.heap[leftIndex].priority > priority) {
        this.swap(index, leftIndex);
        index = leftIndex;
      } else {
        break;
      }

      leftIndex = index * 2 + 1;
      rightIndex = leftIndex + 1;
    }
  }

  swap(i, j) {
    let tmp = this.heap[i];

    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }

  print() {
    let priorities = [];
    let startIndex = 0;
    let count = 1;

    while(startIndex < this.heap.length) {
      priorities.push(this.heap.slice(startIndex, startIndex + count).map(x => x.priority));
      startIndex += count;
      count = count * 2;
    }

    priorities.forEach((x, i, a) => {
      let pLen = Math.pow(2, (a.length - i)) - 1;
      let mLen = Math.floor(pLen / 2);

      let margin = Array(mLen).fill(' ').join('');
      let pad = Array(pLen).fill(' ').join('');
      let nums =  x.join(pad);

      console.log(`${margin}${nums}`);
    });
  }
}

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

module.exports = {
  MaxHeapPriorityQueue,
};


// private helper functions
function getParentIndex(n) {
  return Math.floor((n - 1) / 2);
}
