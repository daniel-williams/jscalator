// Imagine a robot sitting on the upper left corner of grid with r rows
// and c columns. The robot can only move in two directions, right and
// down, but certain cells are "off limits" such that the robot cannot
// step on them. Design an algorithm to find a path for the robot from
// the top left to the bottom right.

// Ideas
// A) Recursively branch right & down until end is reached or unable to move

const A = (grid, current = [0, 0], path = [], visited = new Set()) => {
  let [row, col] = current;

  if(row >= grid.length || col >= grid[0].length || !grid[row][col]) { return null; }
  if(row === grid.length - 1 && col === grid[0].length - 1) { return path; }

  if(visited.has('' + row + col)) {
    return null;
  } else {
    visited.add('' + row + col);
  }

  return A(grid, [row + 1, col], [...path, 'down'], visited)
    || A(grid, [row, col + 1], [...path, 'right'], visited);
};

const buildGrid = (rows, cols, offLimitCells) => {
  const grid = new Array(rows).fill(null).map(row => new Array(cols).fill(1));

  offLimitCells.forEach(([row, col]) => grid[row][col] = 0);

  return grid;
};

// [0][0][x][0][0]
// [0][0][0][0][0]
// [0][0][x][0][0]
// [0][x][0][0][0]
// [x][0][0][0][0]

const nonBlockingOffLimitCells = [[0,2],[2,2],[3,1],[4,0]];
const blockingOffLimitCells = [[0,2],[1,2],[2,2],[3,1],[4,0]];
const tests = [
  [5, 5, nonBlockingOffLimitCells],
  [5, 5, blockingOffLimitCells],
];

tests.forEach(test => {
  console.log('');
  console.log(`-> ${A(buildGrid(...test)) || 'no path'}`);
});
