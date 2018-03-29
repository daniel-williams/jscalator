const { buildListFromChars, LinkedList } = require('../../../structures');

// Given two (singly) linked lists, determine if the two lists intersect.
// Return the intersecting node. Note that the intersection is define based
// on reference, not value. That is, if the kth node of the first linked
// list is the exact same node (by reference) as the jth node of the second
// linked list, then they are intersecting.

// Ideas
// A) For each node in A, compare every node in B
//    Time: O(A*B)
//    Space: O(1)
// B) Determine if lists intersect by comparing the last node of each list. Using the
//    length of each list, advance a pointer on the longer list so that we can walk through
//    both lists to determine the initial intersection node
//    Time: O(A+B)
//    Space: O(1)

// Example
// [a]->[b]->[c]->[d]->
//                     [1]->[2]->[3]
//      [x]->[y]->[z]->

const A = (l1, l2) => {
  if(!l1.head || !l1.head) { return null; }

  let l1Node = l1.head;
  let l2Head = l2Node = l2.head;

  while(l1Node) {
    while(l2Node) {
      if(l1Node === l2Node) {
        return l2Node;
      }

      l2Node = l2Node.next;
    }

    l1Node = l1Node.next;
    l2Node = l2Head;
  }

  return null;
}

const B = (l1, l2) => {
  if(!l1.head || !l2.head) { return null; }

  // Get length and tail of each list
  let { len: l1Len, tail: l1Tail } = getLengthAndTail(l1.head);
  let { len: l2Len, tail: l2Tail } = getLengthAndTail(l2.head);

  // Check last nodes to determine if lists intersect
  if(l1Tail !== l2Tail) { return null; }

  // Initially, set pointer to starting node of each list
  let shorter = l1Len < l2Len ? l1.head : l2.head;
  let longer = l1Len > l2Len ? l1.head : l2.head;

  // Sync pointers (from end)
  longer = getKthNode(longer, Math.abs(l1Len - l2Len));

  // now that pointers are synced, compare each node to determine
  // the intersection node
  while(shorter != longer) {
    shorter = shorter.next;
    longer = longer.next;
  }

  return longer;
}

const getLengthAndTail = (node) => {
  let len = 0;
  let tail = node;

  while(tail) {
    len++;
    tail = tail.next;
  }

  return { len, tail };
}

const getKthNode = (node, k) => {
  while(node && k > 0) {
    node = node.next;
    k--;
  }

  return node;
}

module.exports = {
  s1: A,
  s2: B,
};


let la1 = buildListFromChars('abcdef123456');
let la2 = buildListFromChars('xyz');
let la3 = buildListFromChars('xyz');
let result;

la3.addNode(la1.getNodeAt(6));

console.log('');
console.log(`A) Given [${la1.toArray()}] & [${la2.toArray()}]`);
result = A(la1, la2);
console.log(`   -> ${result ? result.data : null}`);

console.log('');
console.log(`A) Given [${la1.toArray()}] & [${la3.toArray()}]`);
result = A(la1, la3);
console.log(`   -> ${result ? result.data : null}`);

console.log('');
console.log(`B) Given [${la1.toArray()}] & [${la2.toArray()}]`);
result = B(la1, la2);
console.log(`   -> ${result ? result.data : null}`);

console.log('');
console.log(`B) Given [${la1.toArray()}] & [${la3.toArray()}]`);
result = B(la1, la3);
console.log(`   -> ${result ? result.data : null}`);
