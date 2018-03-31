// Given a 2D array of boolean values, return the size of the largest square
// subarray where all values are true.

// Input
const arr = [
  [false, false, false, true, false, false],
  [false,  true, false, true,  true, false],
  [false,  true,  true, true,  true, false],
  [false,  true,  true, true,  true, false],
  [false,  true,  true, true, false, false],
];

// Output = 3 (i.e., subarray starting a[2][1])

const A = (arr) => {
  let max = 0;

  for(let row = 0; row < arr.length; row++) {
    for(let col = 0; col < arr[0].length; col++) {
      if(arr[row][col]) {
        max = Math.max(max, checkSubArray(arr, row, col) + 1);
      }
    }
  }

  return max;

  function checkSubArray(arr, row, col) {
    if(row === arr.length - 1 || col === arr[0].length - 1 || !arr[row][col]) { return 0; }

    return 1 + Math.min(
      checkSubArray(arr, row, col + 1), // right
      checkSubArray(arr, row + 1, col), // bottom
      checkSubArray(arr, row + 1, col + 1), // bottom right
    );
  }
}
// Time: O(n * m * 3^(n + m))
//       : n * m -> for loops
//       : 3^(n + m) -> at each step, we make three recursive calls
// Space: O(n + m) -> recursive stack

const B = (arr) => {
  let max = 0;
  let cache = [];

  // make cache 2D array to match arr
  arr[0].forEach((x, i) => cache[i] = []);

  for(let col = arr[0].length - 1; col >= 0; col--) {
    for(let row = arr.length - 1; row >= 0; row--) {
      max = Math.max(max, checkSubArray(row, col));
    }
  }

  return max;

  function checkSubArray(row, col) {
    if(row === arr.length || col === arr[0].length) {
      return 0;
    }

    if(cache[row][col] == null) {
      cache[row][col] = arr[row][col]
        ? 1 + Math.min(
          checkSubArray(row, col + 1),
          checkSubArray(row + 1, col),
          checkSubArray(row + 1, col + 1))
        : 0;
    }

    return cache[row][col];
  }
}
// Time: O(n * m)
// Space: O(n * m) --> owing to the cache

module.exports = {};


// testing
console.log(`Given the 2D matrix`);
arr.forEach(row => {
  let values = [];

  row.forEach(col => values.push(col ? 1 : 0));
  console.log(`[ ${values.join(', ')}]`);
});
console.log(`The largest subarray is ${B(arr)}`);
