const { buildListFromChars, LinkedList } = require('../../../structures');

// Write code to partition a linked list around a value x, such that
// all nodes less than x come before all nodes greater than or equal to x.
// If x is contained within the list, the values of x only need to be
// after the elements less than x (see below). The partition element x can
// appear anywhere in the "right partition"; it does not need to appear
// between the left and right partitions.

// Example
// Input:
// 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1 [partition= 5]
// Output:
// 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8

// Ideas
// A) Walk nodes of list, building a new list with pointers for head and tail.
//    Comparing each node to partition, insert nodes either at the front or end of new list.
//    time:  O(n)
//    space: O(1)


function A(list, partition) {
  if(!list.head) { return list; }

  let node = list.head;
  // node will be first element of new list
  // add head and tail pointers
  let head = node;
  let tail = node;

  while(node) {
    let save = node.next;

    if(node.data < partition) {
      // insert at head
      node.next = head;
      head = node;
    } else {
      // insert at tail
      tail.next = node;
      tail = tail.next;
    }

    node = save;
  }
  tail.next = null;

  list.head = head;

  return list;
}


let list = buildListFromChars('128326945028');

console.log('');
console.log(`A) Given list [${list.toArray()}] and partition of 5`);
console.log(`   -> [${A(list, 5).toArray()}]`);
