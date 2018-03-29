const { buildList, LinkedList } = require('../structures/linkedList/LinkedList');

// Given a singuly linked list, implement an algorithm that
// determines if the list is circular

// Example
// Input:
// A->B->C->D->E->C [the same C as earlier]
// Output:
// true

const A = (list) => {
  // Empty lists will not have circular refs
  if(!list.head) { return false; }
  // Check if the first node points to itself
  if(list.head.next === list.head) { return true;}

  let slow = fast = list.head;

  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if(slow === fast) {
      return true;
    }
  }

  return false;
}

module.exports = {
  s1: A,
};


let list = buildList('abcdef123456');
let result;

console.log('');
console.log(`A) Given [${list.toArray()}]`);
result = A(list);
console.log(`   -> circular? ${result ? 'yes' : 'no'}`);

console.log(`A) Given [${list.toArray()}] and add ref to 2 from 6`);
list.getNodeAt(11).next = list.getNodeAt(1);
result = A(list);
console.log(`   -> circular? ${result ? 'yes' : 'no'}`);
