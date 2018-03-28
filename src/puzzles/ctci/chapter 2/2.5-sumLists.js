const { buildList, LinkedList } = require('../../../structures/linkedList/LinkedList');

// You have two numbers represented by a linked list, where each node
// contains a single digit. The digits are stored in reverse order,
// such that the 1 's digit is at the head of the list. Write a function
// that adds the two numbers and returns the sum as a linked list.

// Example
// Input: (7-> 1 -> 6) + (5 -> 9 -> 2).That is,617 + 295.
// Output: 2 -> 1 -> 9. That is, 912.

// Follow Up
// Suppose the digits are stored in forward order. Repeat the above problem.
// Input: (6 -> 1 -> 7) + (2 -> 9 -> 5).That is,617 + 295.
// Output: 9 -> 1 -> 2. That is, 912.


// Ideas
// A) Unpacking the numbers: for each list, initialed counter (i = 0) and
//    add each node's value to total using (node.value * Math.pow(10, i++))
//    Packing the sum: using % 10 and some simple maths, pull digits and
//    construct a list
// B) Unpacking forward order: since we don't know how many digits up front
//    create an array, store digits, init counter (c = array.length - 1), then
//    iterate over array, total += a[i] * Math.pow(10, c--)

const A = (l1, l2) => {
  let result = new LinkedList();
  let total = 0;

  [l1, l2].forEach(list => {
    let i = 0;
    let node = list.head;

    while(node) {
      total += node.data * Math.pow(10, i++);
      node = node.next;
    }
  });

  while(total > 0) {
    let digit = total % 10;

    result.add(digit);
    total = (total - digit) / 10;
  }

  return result;
};

const B = (l1, l2) => {
  let result = new LinkedList();
  let total = 0;

  [l1, l2].forEach(list => {
    let nums = [];
    let node = list.head;

    while(node) {
      nums.push(node.data);
      node = node.next;
    }

    let counter = nums.length - 1;

    nums.forEach(n => total += n * Math.pow(10, counter--));
  });

  // using string trickery
  ('' + total).split('').forEach(n => result.add(n));

  return result;
}

module.exports = {
  s1: A,
  s2: B,
};


let l1 = buildList('716');
let l2 = buildList('592');

console.log('');
console.log(`A) Given [${l1.toArray()}] and [${l2.toArray()}]`);
console.log(`   -> [${A(l1, l2).toArray()}]`);

l1 = buildList('617');
l2 = buildList('295');

console.log('');
console.log(`B) Given [${l1.toArray()}] and [${l2.toArray()}]`);
console.log(`   -> [${B(l1, l2).toArray()}]`);
