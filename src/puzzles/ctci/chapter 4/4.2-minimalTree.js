const { BinarySearchTree } = require('../../../structures');

// Given a sorted (increasing order) array with unique integer elements,
// write an algorithm to create a binary search tree with minimal height.

// Ideas
// A) A balanced binary tree would have a min height. Without a self-balancing tree, we could
//    input the numbers in a "balanced order".

const A = (nums) => {
  const bst = new BinarySearchTree();

  minHeightHelper(nums);

  return bst;

  function minHeightHelper(nums) {
    if(!nums.length) { return; }

    let mid = Math.floor((nums.length - 1) / 2);

    bst.add(nums[mid]);

    minHeightHelper(nums.slice(0, mid));
    minHeightHelper(nums.slice(mid + 1));
  }
};

const nums = [2, 12, 26, 33, 41, 59, 60, 75, 88, 92];
const bst = A(nums);

let height = bst.treeHeight;

console.log(`min height = ${Math.floor(Math.log2(nums.length))} -> ${height}`);
