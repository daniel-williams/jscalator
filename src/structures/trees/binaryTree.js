const { Queue } = require('../queue');

class BinaryTree {
  constructor() {
    this._root = null;
  }

  get treeHeight() {
    return this._root ? this._root.height : -1;
  }

  insert(item) {
    let newNode = (item instanceof BinaryTreeNode)
      ? item
      : new BinaryTreeNode(item);

    // special case: empty tree
    if(!this._root) {
      this._root = newNode;
      return;
    }

    const sides = ['left', 'right'];
    const q = new Queue();

    q.enqueue(this._root);

    while(q.size) {
      let node = q.dequeue();

      for(let i = 0; i < sides.length; i++) {
        let side = sides[i];

        if(node[side] != null) {
          q.enqueue(node[side]);
        } else {
          node[side] = newNode;
          node[side].parent = node;

          this.visitNodesToRoot(this.calculateHeight, node[side]);
          return;
        }
      }
    }
  }

  find(v) {
    if(this._root != null) {
      let q = new Queue();

      q.enqueue(this._root);

      while(q.size) {
        let node = q.dequeue();

        if(node.value === v) { return node; }

        if(node.left) { q.enqueue(node.left); }
        if(node.right) { q.enqueue(node.right); }
      }
    }

    return null;
  }

  remove(v) {
    let node = this.find(v);

    if(node == null) { return; }

    if(node.parent == null) {
      // special case: remove root
      if(!node.left && !node.right) {
        // case 1: node to remove has no children
        this._root = null;
      } else if(!node.left || !node.right) {
        // case 2: node to remove has 1 child
        this._root = node.left || node.right;
      } else {
        // case 3: node to remove has 2 children
        let detached = node.right;

        node.right = null;
        this.visitNodesToRoot(this.calculateHeight, node);

        let q = new Queue();
        // find a location for detached in left tree
        q.enqueue(node.left);
        while(q.size) {
          let curr = q.dequeue();

          if(curr.left == null) {
            curr.left = detached;
            this.visitNodesToRoot(this.calculateHeight, curr);
            break;
          } else if(curr.right == null) {
            curr.right = detached;
            this.visitNodesToRoot(this.calculateHeight, curr);
            break;
          }

          if(curr.left) { q.enqueue(curr.left); }
          if(curr.right) { q.enqueue(curr.right); }
        }

        // remove root node
        this._root = node.left;
        this._root.parent = null;
      }
    } else {
      if(!node.left && !node.right) {
        // case 1: node to remove has no children
        if(node.parent.left === node) {
          node.parent.left = null;
        } else {
          node.parent.right = null;
        }
      } else if(!node.left || !node.right) {
        // case 2: node to remove has 1 child
        if(node.parent.left === node) {
          node.parent.left = node.left || node.right;
        } else {
          node.parent.right = node.left || node.right;
        }
      } else {
        // case 3: node to remove has 2 children
        let detached = node.right; // detach right child

        node.right = null;
        this.visitNodesToRoot(this.calculateHeight, node);

        let q = new Queue();
        // find location for detached in left tree
        q.enqueue(node.left);
        while(q.size) {
          let curr = q.dequeue();

          if(curr.left == null) {
            curr.left = detached;
            this.visitNodesToRoot(this.calculateHeight, curr);
            break;
          } else if(curr.right == null) {
            curr.right = detached;
            this.visitNodesToRoot(this.calculateHeight, curr);
            break;
          }

          if(curr.left != null) { q.enqueue(curr.left); }
          if(curr.right != null) { q.enqueue(curr.right); }
        }

        // remove node
        if(node.parent.left === node) {
          node.parent.left = node.left;
        } else {
          node.parent.right = node.left;
        }

        this.visitNodesToRoot(this.calculateHeight, node.parent);
      }
    }
  }

  toArray() {
    let result = [];

    this.visitNodesInOrder(n => result.push(n));

    return result;
  }

  visitNodesBF(fn, node = this._root) {
    if(node != null) {
      let q = new Queue();

      q.enqueue(node);

      while(!q.isEmpty()) {
        let node = q.dequeue();

        fn(node);

        if(node.left) { q.enqueue(node.left); }
        if(node.right) { q.enqueue(node.right); }
      }
    }
  }

  visitNodesInOrder(fn, node = this._root) {
    if(node != null) {
      if(node.left) { this.visitNodesInOrder(fn, node.left); }
      fn(node);
      if(node.right) { this.visitNodesInOrder(fn, node.right); }
    }
  }

  visitNodesPreOrder(fn, node = this._root) {
    if(node != null) {
      fn(node);
      if(node.left) { this.visitNodesPreOrder(fn, node.left); }
      if(node.right) { this.visitNodesPreOrder(fn, node.right); }
    }
  }

  visitNodesPostOrder(fn, node = this._root) {
    if(node != null) {
      if(node.left) { this.visitNodesPostOrder(fn, node.left); }
      if(node.right) { this.visitNodesPostOrder(fn, node.right); }
      fn(node);
    }
  }

  visitNodesToRoot(fn, node) {
    if(node != null) {
      fn(node);

      if(node.parent != null) { this.visitNodesToRoot(fn, node.parent); }
    }
  }

  calculateHeight(node) {
    if(node != null) {
      let left = node.left ? node.left.height : -1;
      let right = node.right ? node.right.height : -1;

      node.height = 1 + Math.max(left, right);
    }
  }
}

class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.height = 0;

    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

module.exports = {
  BinaryTree,
  BinaryTreeNode,
};
