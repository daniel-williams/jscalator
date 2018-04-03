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
    a.addNode(b);
  }

  removeLink(a, b) {
    a.removeNode(b);
  }

  BFS(fn) {
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

  DFS(fn) {
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

// // create graph
// const graph = new DirectedGraph();

// // create nodes, keep refs & add to graph
// const gn = [];
// for(let i = 0; i < 6; i++) {
//   gn.push(new DirectedGraphNode(i));
//   graph.addNode(gn[i]);
// }

// // using refs, create links between nodes
// const links = [
//   [0,1],
//   [0,4],
//   [0,5],
//   [1,3],
//   [1,4],
//   [2,1],
//   [3,2],
//   [3,4],
// ];
// for(let i = 0; i < links.length; i++) {
//   graph.createLink(gn[links[i][0]], gn[links[i][1]]);
// }

// // test breath-first & depth-first search algorithms
// let results = [];
// graph.BFS(n => results.push(n.value));
// console.log(`BFS -> ${results.join(',')}`);

// results = [];
// graph.DFS(n => results.push(n.value));
// console.log(`DFS -> ${results.join(',')}`);
