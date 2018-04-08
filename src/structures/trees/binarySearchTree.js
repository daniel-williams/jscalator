class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  get treeHeight() {
    return this._root ? this._root.height : -1;
  }

  add(value) {
    let newNode = new TreeNode(value);

    // special case: root === null
    if(!this._root) {
      this._root = newNode;
    } else {
      let node = this._root;

      while(true) {
        if(newNode.value < node.value) {
          if(!node.left) {
            node.left = newNode;
            node.left.parent = node;
            this.visitNodesToRoot(this.calculateNodeHeight, node.left);
            break;
          } else {
            node = node.left;
          }
        } else {
          if(!node.right) {
            node.right = newNode;
            node.right.parent = node;
            this.visitNodesToRoot(this.calculateNodeHeight, node.right);
            break;
          } else {
            node = node.right;
          }
        }
      }
    }
  }

  find(value) {
    let node = null;

    this.visitNodesInOrder(n => {
      if(n.value === value) { node = n; }
    });

    return node;
  }

  toArray() {
    let result = [];

    this.visitNodesInOrder(n => result.push(n.value));

    return result;
  }

  visitNodesInOrder(fn, node = this._root) {
    if(!node) { return; }

    this.visitNodesInOrder(fn, node.left);
    fn(node);
    this.visitNodesInOrder(fn, node.right);
  }

  visitNodesToRoot(fn, node = null) {
    if(!node) { return; }

    while(node) {
      fn(node);

      node = node.parent;
    }
  }

  calculateNodeHeight(node) {
    let leftHeight = node.left ? node.left.height : -1;
    let rightHeight = node.right ? node.right.height : -1;

    node.height = 1 + Math.max(leftHeight, rightHeight);
  }
}

class TreeNode {
  constructor(value) {
    this.value = value;
    this.height = 0;

    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

module.exports = {
  BinarySearchTree,
};
