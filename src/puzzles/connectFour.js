// Connect Four is a game where two players take turns dropping their color
// discs into a vertically suspended grid. The game ends when a player adds
// a disc to the 7x6 playing grid that connects four discs of their color.
// The connected discs can be in a horizontal, vertical or diagonal line.
// Write a function to be called after every turn that returns true if the
// game is over (and false otherwise).


// Ideas
// A) Use a 2D matrix to track player discs. Iterate over each cell from [0,0]
//    to [6, 5] summing together current cell with neighbors (top, left,
//    top-left, and top-right)

const checkForWin = (matrix, player) => {
  for(let row = 0; row < matrix.length; row++) {
    for(let col = 0; col < matrix[0].length; col++) {
      if(matrix[row][col] === player) {
        let cellCount = {v:1, h:1, dl:1, dr: 1};

        if(row > 0) {
          cellCount.v += getAdjCount(counts[row - 1][col], player, 'v');
        }
        if(col > 0) {
          cellCount.h += getAdjCount(counts[row][col - 1], player, 'h');
        }
        if(row > 0 && col > 0) {
          cellCount.dl += getAdjCount(counts[row - 1][col - 1], player, 'dl');
        }
        if(row > 0 && col < matrix.length) {
          cellCount.dr += getAdjCount(counts[row - 1][col + 1], player, 'dr');
        }

        if(cellCount.v === 4 ||
          cellCount.h === 4 ||
          cellCount.dl === 4 ||
          cellCount.dr === 4) { return true; }

        // create map if it does not yet exist
        if(!counts[row][col]) { counts[row][col] = {}; }

        counts[row][col][player] = cellCount;
      }
    }
  }

  return false;

  function getAdjCount(adj, player, dim) {
    let count = 0;

    if(adj && adj[player]) {
      count = adj[player][dim];
    }

    return count;
  }
}

const takeTurn = (matrix, player, col) => {
  for(let i = matrix.length - 1; i >= 0; i--) {
    if(matrix[i][col] === 0) {
      matrix[i][col] = player;
      break;
    }
  }

  console.log('');
  console.log(`Ready player #${player}`);
  printMatrix(matrix);

  return checkForWin(matrix, player);
}

const matrix = new Array(6).fill(0);
let counts = new Array(6);

for(let i = 0; i < 6; i++) {
  matrix[i] = new Array(7).fill(0);
  counts[i] = new Array(7).fill(null);
}

const plays = [
  [1,2],
  [2,3],
  [1,2],
  [2,3],
  [1,2],
  [2,2],
  [1,3],
  [2,4],
  [1,3],
  [2,5],
  [1,6],
  [2,4],
  [1,6],
  [2,4],
  [1,4],
  [2,1],
  [1,1],
  [2,0],
  [1,4],
];

for(let i = 0; i < plays.length; i++) {
  if(takeTurn(matrix, ...plays[i])) {
    console.log('');
    console.log(`Player #${plays[i][0]} wins!`);
    break;
  }
}

function printMatrix(matrix) {
  matrix.forEach(row => {
    let values = [];

    row.forEach(col => values.push(col));
    console.log(`[ ${values.join(', ')}]`);
  });
}
