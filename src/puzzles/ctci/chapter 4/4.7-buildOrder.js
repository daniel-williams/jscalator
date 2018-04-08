const { DirectedGraph, DirectedGraphNode } = require('../../../structures');

// You are given a list of projects and a list of dependencies (which is a
// list of pairs of projects, where the second project is dependent on the
// first project). All of a project's dependencies must be built before the
// project is. Find a build order that will allow the projects to be built. If
// there is no valid build order, return an error.

// Input
// projects: a, b, c, d, e, f
// dependencies: (a, d), (f, b), (b, d), (f, a), (d, c)

// Output
// f, e, a, b, d, c

// Ideas
// A) Use a directed graph with nodes as projects and directed links as
//    dependencies. Augment nodes to keep a count of how many projects
//    depend on it. To determine build order, we iterate with;
//      1) add any project(s) that have a dependency count === 0
//      2) decrement each project w/dependency on those added projects
//      3) repeat steps 1 & 2 while projects w/dependency count === 0 exist
//      4) if there are no remaining project, we have a valid build order


const A = (projects, dependencies) => {
  const graph = new DirectedGraph();
  const depCount = 'dependencyCount';
  let error = null;
  let result = [];

  projects.forEach(name => {
    let project = new DirectedGraphNode(name);

    project[depCount] = 0;
    graph.addNode(project);
  });
  dependencies.forEach(d => {
    let p2 = graph.findNode(d[1]);

    graph.createLink(...d);
    p2[depCount]++;
  });

  let nodes = graph.toArray();

  while(true) {
    // inefficiency here because all projects are checked each iteration
    let noDepNodes = nodes.filter(node => node[depCount] === 0);

    if(noDepNodes.length === 0) {
      let depNodes = nodes.filter(node => node[depCount] > 0);

      if(depNodes.length) {
        error = 'no valid build order';
      }

      break;
    }

    noDepNodes.forEach(node => {
      result.push(node.value);
      node[depCount] = -1;
      node.nodes.forEach(x => x.data[depCount]--);
    });
  }

  return error || result.join(',');
};
// Time: O(p * d) -> where p is number of projects and d is dependencies

const B = (projects, dependencies) => {
  const graph = new DirectedGraph();
  const depCount = 'depCount';

  let buildOrder = [];
  let buildOrderIndex = -1;

  projects.forEach(name => {
    let project = new DirectedGraphNode(name);

    project[depCount] = 0;
    graph.addNode(project);
  });
  dependencies.forEach(dep => {
    graph.createLink(...dep); // p1 gets link to p2
    graph.findNode(dep[1])[depCount]++; // p2 depends on p1, so increment it's depCount
  });

  // find initial projects without dependencies
  graph
    .toArray()
    .filter(p => p[depCount] === 0)
    .forEach(p => buildOrder.push(p));

  while(buildOrderIndex < buildOrder.length - 1) {
    let project = buildOrder[++buildOrderIndex];

    project.nodes.forEach(({data: node}) => {
      node[depCount]--;
      if(node[depCount] === 0) {
        buildOrder.push(node);
      }
    });
  }

  return buildOrder.length === projects.length
    ? buildOrder.map(p => p.value).join(',')
    : 'no valid build order';
}
// Time: O(p + d) -> every project is visited only once &
//                   every dependency is visted only once

const projects = [...'abcdef'];
const dependencies = [['a','d'],['f','b'],['b','d'],['f','a'],['d','c']];

let result = B(projects, dependencies);

console.log(result);
