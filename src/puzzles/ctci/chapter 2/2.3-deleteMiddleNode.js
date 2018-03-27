// Implement an algorithm to delete a node in the middle (i.e., any node but
// the first and last node, not necessarily the exact middle) of a singly
// linked list, given only access to that node.

// Example
// lnput: the node c from the linked list a->b->c->d->e->f
// Result: nothing is returned, but the new linked list looks like a->b->d->e->f

// Ideas
// Kind of a trick question, as you can't get a reference to the previous node.
// A) Copy data from next node into given node, then update given node's pointer to
//    skip the next node.

function A(node) {
  if(node.next) {
    node.data = node.next.data;
    node.next = node.next.next;
  }
}

const LinkedList = require('../../../structures/linkedList/LinkedList').LinkedList;

function getTestList() {
  let list = new LinkedList();
  let chars = 'abcdefghijklmnopqrstuvwxyz';

  chars.split('').forEach(c => list.insert(c));

  return list;
}

let testList = getTestList();

console.log('');
console.log(`A) Given list [${testList.toArray()}]`);
A(testList.getElementAt(2));
console.log(`   -> [${testList.toArray()}]`)
