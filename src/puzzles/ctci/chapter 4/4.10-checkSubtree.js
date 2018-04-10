const { BinaryTree, StringBuilder } = require('../../../structures');

// Tl and T2 are two very large binary trees, with Tl much bigger than T2.
// Create an algorithm to determine if T2 is a subtree of Tl.

// A tree T2 is a subtree of Tl if there exists a node n in Tl such that the
// subtree of n is identical to T2. That is, if you cut off the tree at node
// n, the two trees would be identical.


const A = (t1, t2) => {
  let sb1 = new StringBuilder();
  let sb2 = new StringBuilder();

  treeToString(t1._root, sb1);
  treeToString(t2._root, sb2);

  return {
    t1: sb1.toString(),
    t2: sb2.toString(),
  };

  function treeToString(root, sb) {
    if(!root) {
      sb.append('-,');
      return;
    }

    sb.append(`${root.value},`);

    treeToString(root.left, sb);
    treeToString(root.right, sb);
  }
};

const t1 = new BinaryTree();
const t2 = new BinaryTree();

const v1 = new Array(50).fill(null).map((n, i) => i + 1);
v1.forEach(v => t1.insert(v));
let t1Node = t1.find(v1[Math.floor(Math.random() * 20) + 10]);

const v2 = [];
t1.visitNodesBF(n => v2.push(n.value), t1Node);
v2.forEach(v => t2.insert(v));

let result = A(t1, t2);

console.log('t1 -> ', result.t1);
console.log('t2 -> ', result.t2);
console.log('t2 subtree of t1 -> ', result.t1.indexOf(result.t2) >= 0);
