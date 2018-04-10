const { BinaryTree, Queue } = require('../../../structures');

// You are given a binary tree in which each node contains an integer
// value (which might be, positive or negative). Design an algorithm to
// count the number of paths that sum to a given value. The path does not
// need to start or end at the root or a leaf, but it must go downwards
// (traveling only from parent nodes to child nodes).

// Ideas
// A) Visit each node and then DFS all possible paths while summing values
//    and incrementing count each time sum is equal to target

//                    0
//           5                 -5
//       1          4       3        2
//   -2     -1   -4  -3   8   6    9   7
// -6 -9  -8  -7


const A = (root, targetSum) => {
  if(!root) { return 0; }

  let count = 0;
  let visited = new Set();
  let q = new Queue();

  q.enqueue(root);

  while(q.size) {
    let node = q.dequeue();

    dfSumHelper(node, 0);

    if(node.left) { q.enqueue(node.left); }
    if(node.right) { q.enqueue(node.right); }
  }

  function dfSumHelper(node, sum) {
    sum += node.value;

    if(sum === targetSum && !visited.has(node)) {
      count++;
      visited.add(node);
    }

    if(node.left) { dfSumHelper(node.left, sum); }
    if(node.right) { dfSumHelper(node.right, sum); }
  }

  return count;
};

const tree = new BinaryTree();
const values = [0,5,-5,1,4,3,2,-2,-1,-4,-3,8,6,9,7,-6,-9,-8,-7];

values.forEach(val => tree.insert(val));

let result = A(tree._root, 6);

console.log(` -> ${result}`);
