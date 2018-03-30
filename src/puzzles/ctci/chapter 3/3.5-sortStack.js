const { Stack } = require('../../../structures');

// Write a program to sort a stack such that the smallest items are on the top.
// You can use an additional temporary stack, but you may not copy the elements
// into any other data structure (such as an array). The stack supports the
// following operations: push, pop, peek, and is Empty.

// Examples
// [5]
// [7]
// [3]
// [4]
// [8]
// [2]

// Ideas
// A) Two stacks (sortedStack, unsortedStack). While unsortedStack is not empty, pop value (v) and
//    compare to sortedStack.peek(). If greater, push v to sortedStack, if smaller, pop all items from
//    sortedStack, pushing them onto unsortedStack, then push v to sortedStack.


const sortStack = (unsorted) => {
  let sorted = new Stack();

  while(unsorted.peek() != null) {
    let v = unsorted.pop();
    let sv = sorted.peek();

    if(sv != null && sv < v) {
      while(sorted.peek() != null) {
        unsorted.push(sorted.pop());
      }
    }

    sorted.push(v);
  }

  return sorted;
};


module.exports = {};


let unsortedStack = new Stack();
let nums = [5,7,3,4,4,8,7,2];

nums.forEach(n => unsortedStack.push(n));

let sortedStack = sortStack(unsortedStack);

let result = [];

while(sortedStack.peek() != null) {
  result.push(sortedStack.pop());
}

console.log(`A) Given [${nums.join(',')}] -> [${result.join(',')}]`);



