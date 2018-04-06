const { BinarySearchTree } = require('../../../structures');

// Implement a function to check if a binary tree is balanced. For the purposes
// of this question, a balanced tree is defined to be a tree such that the
// heights of the two subtrees of any node never differ by more than one.

// Ideas
// A) Use bottum-up recursion where each node's height is calculated by
//    1 + Math.max(left.height, right.height), and leaf nodes have height = 0
//    and a null is treated as height = -1


const A = (node) => {
  let balanced = true;

  if(node) { helper(node); }

  return balanced;

  function helper(node) {
    let leftHeight = 1 + (node.left ? helper(node.left) : -1);
    let rightHeight = 1 + (node.right ? helper(node.right) : -1);

    if(Math.abs(leftHeight - rightHeight) > 1) {
      balanced = false;
    }

    return Math.max(leftHeight, rightHeight);
  }
};
// Time: O(n) -> each node is visited to determine height
// Space: O(h) -> call stack and height of tree


const tests = [
  [[12,9,6,15], true],
  [[12,9,6,3,15], false],
  [[41,12,75,2,26,59,88,33,60,92], true],
  [[41,92,60,12,75,2,33,26,59,88], false],
];

tests.forEach(test => {
  const bst = new BinarySearchTree();

  test[0].forEach(v => bst.add(v));
  console.log(`BST primed with [${test[0].join(',')}] -> ${A(bst._root)}`);
});
