const { BinarySearchTree } = require('../../../structures');

// Implement a function to check if a binary tree is a binary search tree.

// Ideas
// A) Every node should exhibit the bst property, i.e., all values in the
//    left tree are less than or equal to parent and all values in the right
//    tree are greater than parent

// Examples
//    5
//  3   9
// 1 4 7

// Ideas
// A) Recursively check each node's value against a range constraint
//    for it's subtree


const A = (node) => {
  let isBst = true;

  helper(node, null, null);

  return isBst;

  function helper(node, min, max) {
    if(!node) { return true; } // base case

    if((min && node.value <= min) ||
      (max && node.value > max)) {
      isBst = false;
      return; // early exit
    }

    // update range constraints and recurse left/right
    helper(node.left, min, node.value);
    helper(node.right, node.value, max);
  }
};

const bst = new BinarySearchTree();
const values = [23, 81, 42, 117, 5, 99, 7, 13, 68];

values.forEach(value => bst.add(value));

console.log(`Given [${values.join(',')}] -> ${A(bst._root)}`);

bst._root.left.value = 120;
console.log(`corrupting bst -> ${A(bst._root)}`);
