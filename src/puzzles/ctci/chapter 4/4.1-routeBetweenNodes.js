const { DirectedGraph, DirectedGraphNode, Stack } = require('../../../structures');

// Given a directed graph, design an algorithm to find out whether there is a
// route between two nodes.

// Ideas
// A) DFS would potentially be more efficient for finding direct routes. Using
//    a map to track node/parent pairs from start to end would allow us to
//    return:
//      a) if the route exists (this scenario)
//      b) numbers of hops
//      c) the route itself
// B) Might be slightly more efficient to use a Set instead of a map and not
//    worry about tracking the route itself, just focus on finding end node.
//    Also, an iterative DFS vs recursive DFS might also be more efficient.


const A = (startNode, endNode) => {
  if(!startNode || !endNode) { return false; }

  let parentMap = {};

  dfsHelper(startNode);

  function dfsHelper(node, parent = null) {
    if(parentMap[node.value] !== undefined) { return; }

    parentMap[node.value] = parent;

    if(node === endNode) { return; }

    node.nodes.forEach(n => dfsHelper(n.data, node));
  }

  return !!parentMap[endNode.value];
};
// Time: O(n) -> worst case if every node is visited
// Space: O(n) -> call stack & parentMap

const B = (start, end) => {
  if(!start || !end) { return false; }

  let visited = new Set();
  let stack = new Stack();

  visited.add(start);
  stack.push(start);

  while(!stack.isEmpty()) {
    let node = stack.pop();

    if(node === end) { return true; }

    node.nodes.forEach(n => {
      if(!visited.has(n.data)) { stack.push(n.data); }
    });
  }

  return false;
}
// Time: O(n) -> worst case, every node could be visited once
// Space: O(n) -> Set & Stack


const graph = buildTestGraph();
const nodeCount = graph.nodes.length;
const solutions = [
  ['A', A],
  ['B', B],
];

solutions.forEach(s => {
  console.log('');
  for(let i = 0; i < nodeCount; i++) {
    for(let j = 0; j < nodeCount; j++) {
      if(i === j) { continue; }

      console.log(`${s[0]}) Route between node ${i} and ${j} -> ${s[1](graph.findNode(i), graph.findNode(j))}`);
    }
  }
});



//   [4]<-[3]->[2]
//   /  \ /   /
// [0]->[1]<-/
//   \
//   [5]

// help methods for tests
function buildTestGraph() {
  const graph = new DirectedGraph();
  const numNodes = 6;
  const links = [[0,1],[0,4],[0,5],[1,3],[1,4],[2,1],[3,2],[3,4]];

  // add nodes
  for(let i = 0; i < numNodes; i++) {
    graph.addNode(new DirectedGraphNode(i));
  }

  // create links between nodes
  for(let i = 0; i < links.length; i++) {
    graph.createLink(links[i][0], links[i][1]);
  }

  return graph;
}
