// You are implementing a binary tree class from scratch which, in addition
// to insert, find, and delete, has a method getRandomNode() which returns a
// random node from the tree. All nodes should be equally likely to be
// chosen. Design and implement an algorithm for getRandomNode, and explain
// how you would implement the rest of the methods.

// Ideas
// A) Augment BinaryTree with a nodeCount property. getRandomNode() would use
//    nodeCount to generate a random, and the appropriate node could be
//    returned with a BFS tranversal.
// B) Because every node maintains a count, use random number and that count
//    information to traverse a level at a time, eliminating nodes greater
//    than or less than random number.

class BTRand {
  constructor() {
    this._root = null;
  }

  get nodeCount() {
    return this._root.count;
  }

  calculateCount(node) {
    this.visitNodesToRoot(n => {
      n.count = 1 + (n.left ? n.left.count : 0) + (n.right ? n.right.count : 0);
    }, node);
  }

  visitNodesToRoot(fn, node) {
    if(!node) { return; }

    fn(node);

    if(node.parent) { this.visitNodesToRoot(fn, node.parent); }
  }

  insert(value) {
    let newNode = (value instanceof BTRandNode)
      ? value
      : new BTRandNode(value);

    // special case: empty tree
    if(!this._root) {
      this._root = newNode;
      return;
    }

    // find first available position to attach node
    let q = [this._root];

    while(q.length) {
      let node = q.shift();

      if(!node.left) {
        node.left = newNode;
        node.left.parent = node;
        this.calculateCount(node);
        break;
      } else if(!node.right) {
        node.right = newNode;
        node.right.parent = node;
        this.calculateCount(node);
        break;
      }

      q.push(node.left);
      q.push(node.right);
    }
  }

  find(value) {
    // perform BFT to find node with value
  }

  delete(value) {
    // find node
    // determine if node is root or not
    // determine if node has zero, one, or two children
    // remove node, reordering children in the normal way, while recalculating
    //   node count for the parent and any detached/attached node (in the case
    //   where removed node had two children)
  }

  getRandomNodeA() {
    if(!this._root) {
      return null;
    }

    let rndIndex = Math.floor(Math.random() * this.nodeCount);
    let q = [this._root];
    let qi = 0;

    while(qi < rndIndex && rndIndex >= q.length) {
      let node = q[qi];

      if(node.left) { q.push(node.left); }
      if(node.right) { q.push(node.right); }

      qi++;
    }

    return q[rndIndex];
  }

  getRandomNodeB(num) {
    if(!this._root) {
      return null;
    }

    let rnd = num || Math.floor(Math.random() * this.nodeCount);

    return helper(this._root, rnd);

    function helper(node, num) {
      let leftCount = node.left && node.left.count || 0;

      if(num < leftCount) {
        return helper(node.left, num);
      } else if(num === leftCount) {
        return node;
      } else {
        return helper(node.right, num - (leftCount + 1))
      }
    }
  }
}

class BTRandNode {
  constructor(val) {
    this.value = val;
    this.count = 1;

    this.right = null;
    this.left = null;
    this.parent = null;
  }
}

const tree = new BTRand();
const hits = {};
const values = new Array(50).fill(null).map(() => {
  while(true) {
    let rnd = Math.floor(Math.random() * 100)

    if(hits[rnd] == null) {
      hits[rnd] = 0;
      return rnd;
    }
  }
});

values.forEach(val => tree.insert(val));

for(let i = 0; i < 500; i++) {
  let n = tree.getRandomNodeB();

  if(hits[n.value] == null) {
    console.log('miss? ', n.value);
  } else {
    hits[n.value]++;
  }
}

Object.keys(hits).forEach(n => {
  console.log(`${n}:${hits[n]}`);
});
