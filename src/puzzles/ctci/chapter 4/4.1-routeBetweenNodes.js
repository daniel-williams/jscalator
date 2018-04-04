const { DirectedGraph, DirectedGraphNode } = require('../../../structures');

const A = (graph, startNode, endNode) => {
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


const graph = buildTestGraph();
const nodeCount = graph.nodes.length;

for(let i = 0; i < nodeCount; i++) {
  for(let j = 0; j < nodeCount; j++) {
    if(i === j) { continue; }

    console.log(`Route between node ${i} and ${j} -> ${A(graph, graph.findNode(i), graph.findNode(j))}`);
  }
}



//   [4]<-[3]->[2]
//   /  \ /   /
// [0]->[1]<-/
//   \
//   [5]

// help methods for tests
function buildTestGraph() {

  // create graph
  const graph = new DirectedGraph();

  // create nodes
  for(let i = 0; i < 6; i++) {
    graph.addNode(new DirectedGraphNode(i));
  }

  // using refs, create links between nodes
  const links = [
    [0,1],
    [0,4],
    [0,5],
    [1,3],
    [1,4],
    [2,1],
    [3,2],
    [3,4],
  ];
  for(let i = 0; i < links.length; i++) {
    graph.createLink(links[i][0], links[i][1]);
  }

  return graph;
}
