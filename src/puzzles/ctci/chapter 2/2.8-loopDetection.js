const { buildListFromChars, LinkedList } = require('../../../structures');

// Given a circular linked list, implement an algorithm that
// returns the node at the beginning of the loop.

// Definition
// Circular linked list: A (corrupt) linked list in which a node's
// next pointer points to an earlier node, so as to make a loop in
// the linked list.

// Example
// Input:
// A->B->C->D->E->C [the same C as earlier]
// Output:
// C

// Ideas
// A) Use a map (Set). Check if node exist in map and if so return it, or
//    add node to map and advance pointer.
//    Time: O(n)
//    Space: O(n)
// B) Iterate over each node, comparing it to all other nodes.
//    Time: O(n^2)
//    Space: O(1)
// C) Using fast/slow pointers and algorithm to determine if the list is
//    circular, we leave a pointer at the collision point and move the
//    other pointer to head, advancing both pointers in step with result in
//    another collision at the start of the cirecular loop
//    Time: O(n)
//    Space: O(1)

// Assumptions
// Given list will be circular

const C = (list) => {
  if(list.head === list.head.next) { return list.head; }

  let slow = fast = list.head;

  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if(slow === fast) {
      break;
    }
  }

  if(fast === null || fast.next === null) { return null; }

  slow = list.head;
  while(slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}

module.exports = {
  s1: C,
};


let list = buildListFromChars('abcduvwxyz');

console.log(`C) Given [${list.toArray()}] and add ref to u from z`);
list.getNodeAt(9).next = list.getNodeAt(4);
console.log(`   -> circular ref at ${C(list).data}`);
