const { BinarySearchTree, LinkedList, Queue } = require('../../../structures');

// Given a binary tree, design an algorithm which creates a linked list of all
// the nodes at each depth (e.g., if you have a tree with depth D, you'll have
// D linked lists).

// Ideas
// A) Use a queue and depth first traversal to add each node, along with the node's depth.
//    As we process nodes from the queue, they are added to linked lists according to their
//    depth

const A = (bst) => {
  let lists = [];
  let queue = new Queue();
  let root = bst._root;

  if(root) {
    root['depth'] = 0;
    queue.enqueue(root);
  }

  while(!queue.isEmpty()) {
    let node = queue.dequeue();

    if(!lists[node.depth]) {
      lists[node.depth] = new LinkedList();
    }

    lists[node.depth].add(node);

    [node.left, node.right].forEach(child => {
      if(child) {
        child['depth'] = node.depth + 1;
        queue.enqueue(child);
      }
    });
  }

  return lists;
}


const bst = new BinarySearchTree();
const values = [42, 23, 117, 68, 11, 21, 55, 63, 99, 17];

values.forEach(value => bst.add(value));

const lists = A(bst);

console.log(`Given a BST primed with [${values.join(',')}]`)
lists.forEach((list, i) => console.log(`  -> list at depth #${i} -> [${list.toArray().map(n => n.value).join(',')}]`));
