// Write a function such that if an element is zero
// it's entire row and column are set to zeros.

// Ideas
// A) Walk all elements in the matrix and cache the location of all zeros
//    then using pointers, loop through each element in row/column and set to zero.
//    O(m*n) time


function A(matrix) {
  let tuples = [];
  let width = matrix[0].length;
  let height = matrix.length;

  // find all elements where value is zero
  for(let row = 0; row < height; row++) {
    for(let col = 0; col < width; col++) {
      if(matrix[row][col] === 0) {
        tuples.push([row, col]);
      }
    }
  }

  tuples.forEach(x => {
    // zero row
    for(let col = 0; col < width; col++) {
      let row = x[0];

      matrix[row][col] = 0;
    }

    // zero column
    for(let row = 0; row < height; row++) {
      let col = x[1];

      matrix[row][col] = 0;
    }
  });

  return matrix;
}

module.exports = {
  s1: A,
};


const tests = [
  [
    [1,1,1,1,1],
    [1,1,0,1,1],
    [1,1,1,1,1],
  ],
  [
    [0,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,0],
  ],
];

tests.forEach(x => {

  console.log('Given the matrix: ');
  x.forEach(row => console.log(`[${row.join(',')}]`));

  let result = A(x);
  console.log('');
  console.log('Zeroed matrix: ');
  result.forEach(row => console.log(`[${row.join(',')}]`));

});