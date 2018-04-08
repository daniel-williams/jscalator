const { BinarySearchTree } = require('../../../structures');

// Design an algorithm and write code to find the first common ancestor of
// two nodes in a binary tree. Avoid storing additional nodes in a data
// structure. NOTE: This is not necessarily a binary search tree.


// Ideas
// A) Walk up to root from second node testing at each node for equality with
//    first node. If not found walk first node to it's parent. repeat.
// B) Determine depth of each node, walk deeper node towards root to sync
//    depths, then walk both towards root checking for equality

// A & B assumes nodes have link to parent

// C) Without a link to parent. Walk first node up to root, checking if first
//    node "covers" second node at each step, if so, that's the ancestor.

const A = (n1, n2) => {
  if(n1 == null || n2 == null) { return null; }

  let t1 = n1;
  let t2 = n2;

  while(t1) {
    while(t2) {
      if(t1 === t2) { return t1; }

      t2 = t2.parent;
    }

    t1 = t1.parent;
    t2 = n2;
  }

  return null;
};
// Time: O(d * d) -> where d = depth of tree

const B = (n1, n2) => {
  let d1 = getDepth(n1);
  let d2 = getDepth(n2);
  let delta = Math.abs(d1 - d2);

  let shallow = d1 <= d2 ? n1 : n2;
  let deep = d1 > d2 ? n1 : n2;

  while(delta > 0) {
    deep = deep.parent;
    delta--;
  }

  while(shallow) {
    if(shallow === deep) { return shallow; }

    shallow = shallow.parent;
    deep = deep.parent;
  }

  return null;

  function getDepth(n) {
    let depth = 0;

    while(n.parent != null) {
      n = n.parent;
      depth++;
    }

    return depth;
  }
};
// Time: O(d) => depth of tree (d * 3 reduces to d)

const C = (n1, n2) => {
  while(n1) {
    if(covers(n1, n2)) { return n1; }

    n1 = n1.parent;
  }

  return null;

  function covers(n1, n2) {
    if(n1 === null) return false;
    if(n1 === n2) return true;

    return covers(n1.left, n2) || covers(n1.right, n2);
  }
}
// Time: O(n)

const D = (n1, n2, root) => {
  if(!covers(root, n1) || !covers(root, n2)) { return null; }

  return helper(n1, n2, root);

  function helper(n1, n2, root) {
    if(root == null || n1 == root || n2 == root) { return root; }

    let n1IsLeft = covers(root.left, n1);
    let n2IsLeft = covers(root.left, n2);

    if(n1IsLeft != n2IsLeft) { return root; }

    let nextRoot = n1IsLeft ? root.left : root.right;

    return (n1, n2, nextRoot);
  }

  function covers(n1, n2) {
    if(n1 == null || n2 == null) { return false; }
    if(n1 === n2) { return true; }

    return covers(n1.left, n2) || covers(n1.right, n2);
  }
}

const bst = new BinarySearchTree();
const values = [42,117,23,5,25,1,13,7,99,68,51];

values.forEach(value => bst.add(value));

let n1 = bst.find(values[5]);
let n2 = bst.find(values[4]);
let result = D(n1, n2, bst._root);

console.log(`Given BST primed with [${values.join(',')}]`);
console.log(`first common ancestor of ${n1.value} and ${n2.value} -> ${result && result.value}`);
