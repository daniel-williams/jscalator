// Write code to remove duplicates from an unsorted linked list.
// FOLLOW UP
// How would you solve this problem if a temporary buffer is not allowed?

// Ideas
// A) Use a Set to cache existing valus and determine dups - O(n) time, O(n) space
// B) Without using a cache, we could use to pointers to compare each element with
//    every other element - O(n^2) time, O(1) space

function A(list) {
  // gaurd against empty list
  if(!list.head) { return list; }

  let previous = node = list.head;
  let set = new Set();

  set.add(node.data); // first node will never be a dup
  node = node.next;

  while(node) {
    // check for dup
    if(set.has(node.data)) {
      // remove node reference from list
      previous.next = node.next;
    } else {
      // else node data to set
      set.add(node.data);
    }

    // advance node pointers
    previous = node;
    node = node.next;
  }

  return list;
}

function B(list) {
  // gaurd against empty list
  if(!list.head) { return list; }

  let startNode = list.head;

  while(startNode) {
    let previous = startNode;
    let current = startNode.next;

    while(current) {
      // check if dup
      if(current.data === startNode.data) {
        // remove node reference from list
        previous.next = current.next;
      }

      previous = current;
      current = current.next;
    }

    startNode = startNode.next;
  }

  return list;
}

module.exports = {
  s1: A,
  s1: B,
};


const LinkedList = require('../../../structures/linkedList/LinkedList').LinkedList;

function getTestList() {
  let list = new LinkedList();

  list.insert(1);
  list.insert(2);
  list.insert(3);
  list.insert(2);
  list.insert(4);
  list.insert(5);
  list.insert(1);

  return list;
}

let testAList = getTestList();
let testBList = getTestList();

testBList.insert(6);
testBList.insert(6);
testBList.insert(7);
testBList.insert(6);

console.log(`A) Given list ${testAList.toArray()} --> ${A(testAList).toArray()}`);
console.log(`B) Given list ${testBList.toArray()} --> ${B(testBList).toArray()}`);
