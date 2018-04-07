const { BinarySearchTree, Queue } = require('../../../structures');

// Write an algorithm to find the "next" node (i.e., in-order successor) of
// a given node in a binary search tree. You may assume that each node has
// a link to its parent.


const A = (node) => {
  if(!node) { return null; }

  // if it exists, the right node would be traversed next
  if(node.right) {
    node = node.right;

    // traverse left as far as possible
    while(node.left) {
      node = node.left;
    }

    return node;
  }

  while(node.parent) {
    // check if this node is the right node of its parent
    if(node.parent.right && node.parent.right === node) {
      node = node.parent;
      continue;
    }

    // this node is the left node of its parent and therefore
    // parent would be next for an in-order traversal
    return node.parent;
  }

  return null;
};


const bst = new BinarySearchTree();
const values = [23, 81, 42, 117, 5, 99, 7, 13, 68];

  //     23
  //  5       81
  //   7   42    117
  //    13   68 99

values.forEach(value => bst.add(value));

const node = bst._root;
const q = new Queue();
const dfHelper = (node) => {
  if(node) {
    dfHelper(node.left);
    q.enqueue(node);
    dfHelper(node.right);
  }
};
dfHelper(node);

console.log(`Given BST primed with [${values.join(',')}]`);
while(!q.isEmpty()) {
  let node = q.dequeue();
  let next = A(node);

  console.log(`  -> next node after ${node.value} is ${next && next.value || next}`);
}
