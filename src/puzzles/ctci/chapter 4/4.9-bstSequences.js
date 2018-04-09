const { ArrayList, BinarySearchTree } = require('../../../structures');

// A binary search tree was created by traversing through an array from
// left to right and inserting each element. Given a binary search tree
// with distinct elements, print all possible arrays that could have
// led to this tree.

// Input
//       [5]
//   [4]     [7]
// [1] [3] [6] [8]

// Output

// Ideas
// A) Recurse down and start at leaf nodes. Each node prefixes the result
//    returned to it with each order possibilities. Determine all order
//    possibilities by weaving arrays


const A = (root) => {
  let result = new ArrayList();

  if(!root) {
    result.insert([]);
    return result.toArray();
  }

  let prefix = [root.value];
  let left = A(root.left);
  let right = A(root.right);

  left.forEach(l => {
    right.forEach(r => {
      let weaved = new ArrayList();

      weaveArrays(l, r, prefix, weaved);

      weaved.toArray().forEach(x => result.insert(x));
    });
  });

  return result.toArray();
};

function weaveArrays(first, second, prefix, result) {
  if(!first.length || !second.length) {
    result.insert(prefix.concat(first, second));
    return;
  }

  weaveArrays(first.slice(1), second, prefix.concat(first[0]), result);
  weaveArrays(first, second.slice(1), prefix.concat(second[0]), result);
}

const bst = new BinarySearchTree();
const values = [5,6,2,7,4];

values.forEach(value => bst.add(value));

let result = A(bst._root);

result.forEach(x => {
  console.log(` -> [${x.join(',')}]`);
});