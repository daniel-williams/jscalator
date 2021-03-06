const { buildListFromChars, LinkedList } = require('../../../structures');

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


let list = buildListFromChars('abcde');

console.log('');
console.log(`A) Given list [${list.toArray()}]`);
A(list.getNodeAt(2));
console.log(`   -> [${list.toArray()}]`)
