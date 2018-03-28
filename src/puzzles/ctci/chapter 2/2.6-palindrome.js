const { buildList, LinkedList } = require('../../../structures/linkedList/LinkedList');

// Implement a function to check if a linked list is a palindrome.

// Ideas
// A) use a slow and fast pointer and walk nodes, at each step, add
//    slow.data to a stack. When fast pointer reaches the end of the
//    list, slow pointer is at the middle. Continue walking with slow
//    pointer, comparing node value to stack values. (what about odd
//    number of items?)

const A = (list) => {
  // zero or one item is palindrome
  if(!list.head || !list.head.next) { return ture; }

  let node = list.head;
  let slow = node; // slow pointer
  let fast = node; // fast pointer
  let stack = [];

  while(fast && fast.next) {
    stack.push(slow.data);
    // advance pointers
    slow = slow.next;
    fast = fast.next.next;
  }

  // check for odd number of nodes
  if(fast) {
    slow = slow.next; // middle value can be ignored
  }

  while(slow) {
    if(slow.data !== stack.pop()) {
      return false;
    }
    slow = slow.next;
  }

  return true;
}


module.exports = {
  s1: A,
};


let list1 = buildList('abcddcba');
let list2 = buildList('abcdedcba');
let list3 = buildList('abcddcab');

console.log('');
console.log(`A) Given [${list1.toArray()}] -> ${A(list1)}`);
console.log(`A) Given [${list2.toArray()}] -> ${A(list2)}`);
console.log(`A) Given [${list3.toArray()}] -> ${A(list3)}`);