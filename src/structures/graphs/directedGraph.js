const { LinkedList } = require('../linkedList');
const { Queue } = require('../queue');


class DirectedGraph {
  constructor() {
    this.nodes = [];
  }

  addNode(node) {
    if(!this.nodes.find(n => node === n)) {
      this.nodes.push(node);
    }
  }

  createLink(a, b) {
    let aNode = this.findNode(a);
    let bNode = this.findNode(b);

    if(aNode && bNode) {
      aNode.addNode(bNode);
    }
  }

  removeLink(a, b) {
    let aNode = this.findNode(a);
    let bNode = this.findNode(b);

    if(aNode && bNode) {
      aNode.removeNode(bNode);
    }
  }

  findNode(v) {
    return this.nodes.find(n => n.value === v);
  }

  forEachBF(fn) {
    if(!this.nodes.length) { return; }

    let visited = new Set();
    let queue = new Queue();

    this.nodes.forEach(n => {
      if(!visited.has(n)) {
        visited.add(n);
        queue.enqueue(n);

        while(queue.size) {
          let curNode = queue.dequeue();

          fn(curNode);

          curNode.nodes.toArray().forEach(adjNode => {
            if(!visited.has(adjNode)) {
              visited.add(adjNode);
              queue.enqueue(adjNode);
            }
          });
        }
      }

    });
  }

  forEachDF(fn) {
    if(!this.nodes.length) { return; }

    const visited = new Set();

    this.nodes.forEach(n => depthFirstHelper(n));

    function depthFirstHelper(node) {
      if(visited.has(node)) { return; }

      fn(node);
      visited.add(node);

      node.nodes.toArray().forEach(n => {
        depthFirstHelper(n);
      });
    }
  }
}

class DirectedGraphNode {
  constructor(value) {
    this.value = value;
    this.nodes = new LinkedList();
  }

  addNode(node) {
    // add node link if it does not already exist
    if(!this.nodes.toArray().find(n => node === n)) {
      this.nodes.add(node);
    }
  }

  removeNode(node) {
    this.nodes.removeNode(node);
  }
}

module.exports = {
  DirectedGraph,
  DirectedGraphNode,
};
