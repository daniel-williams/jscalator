// successive passes bubble the largest value to the end of the unsorted portion of the array

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

function swap(a, i, j) {
  const tmp = a[i];

  a[i] = a[j];
  a[j] = tmp;
}

module.exports = {
  constants: {},
  solutions: [
    solution1,
  ],
}