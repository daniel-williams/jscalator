// Successive passes bubble the largest value
// to the end of the unsorted portion of the array.

// Time complexity
// best: O(n)
// average: O(n^2)
// worst: O(n^2)

const solution1 = (a) => {
  let result = a.slice();
  let sorted = false;
  let len = result.length;

  while(!sorted) {
    sorted = true;

    for(i = 0;i < len - 1; i++) {
      if(result[i] > result[i + 1]) {
        swap(result, i, i + 1);
        sorted = false;
      }
    }

    len--; // each pass bubbles up largest value to last index
  }

  return result;
};

const reviewBubbleSort = (a) => {
  for(let i = a.length - 1; i > 0; i--) {
    let sorted = true;

    for(let j = 1; j <= i; j++) {
      if(a[j - 1] > a[j]) {
        swap(a, j - 1, j);
        sorted = false;
      }
    }

    if(sorted) { return a; }
  }

  return a;
};

function swap(a, i, j) {
  const tmp = a[i];

  a[i] = a[j];
  a[j] = tmp;
}

module.exports = {
  constants: {},
  solutions: [
    solution1,
    reviewBubbleSort,
  ],
}