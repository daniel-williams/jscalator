class BinarySearchTree {
  constructor() {
    this._root = null;
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
            break;
          } else {
            node = node.left;
          }
        } else {
          if(!node.right) {
            node.right = newNode;
            break;
          } else {
            node = node.right;
          }
        }
      }
    }
  }

  toArray() {
    let result = [];

    this.visitNodesInOrder(this._root, n => result.push(n.value));

    return result;
  }

  visitNodesInOrder(node, fn) {
    if(!node) { return; }

    this.visitNodesInOrder(node.left, fn);
    fn(node);
    this.visitNodesInOrder(node.right, fn);
  }
}

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

module.exports = {
  BinarySearchTree,
};
