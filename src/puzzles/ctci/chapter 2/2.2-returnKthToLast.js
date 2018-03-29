const { buildListFromChars, LinkedList } = require('../../../structures');

// Implement an algorithm to find the kth to last element of a singly linked list.

// Ideas
// A) Iterate list, pushing each item onto stack, then pop off K elements
//    time:  O(n)
//    space: O(n)
// B) Iterate once to count nodes, then iterate knowing the location of the target node(s)
//    time:  o(n) - technically, but really O(2*n)
//    space: O(1) space
// C) Two pointers, first pointer advances Kth nodes, then both pointers advance at same rate
//    until first pointer reaching the end, which puts second pointer at target node
//    time: O(n)
//    space: O(1)

// assumptions: list node count >= k

function C(list, k) {
  if(!list.head || k === 0) { return []; }

  let result = [];
  let p1 = p2 = list.head;
  let count = k;

  // advance p1 k nodes
  while(count) {
    p1 = p1.next;
    count--;
  }

  // advance both pointers until p1 gets to the end of the list
  while(p1) {
    p1 = p1.next;
    p2 = p2.next;
  }

  // p2 is not at Kth node from the end of list
  while(p2) {
    result.push(p2);
    p2 = p2.next;
  }

  return result;
}

module.exports = {
  s1: C,
};


let list = buildListFromChars('abcdefghijklmnopqrstuvwxyz');

console.log(`C) Given list ${list.toArray()} & k = 10 -> [${C(list, 10).map(x=>x.data).join(',')}]`)
