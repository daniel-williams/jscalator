// moving left to right, each value is repeatedly moved
// left until no smaller left value is found

const solution1 = (a) => {
  // gaurd against empty and one element arrays
  if(a.length <= 1) { return a; }

  let result = a.slice();

  for(let i = 1; i <= result.length - 1; i++) {
    let target = i;

    while(target > 0 && result[target] < result[target - 1]) {
      swap(result, target, target - 1);
      target--;
    }
  }

  return result;
}

const reviewInsertionSort = (a) => {
  for(let i = 1; i < a.length; i++) {
    let inPointer = i;

    while(inPointer > 0 && a[inPointer] < a[inPointer - 1]) {
      swap(a, inPointer, inPointer - 1);
      inPointer--;
    }
  }

  return a;
}

function swap(a, i, j) {
  const tmp = a[i];

  a[i] = a[j];
  a[j] = tmp;
}

module.exports = {
  constants: {},
  solutions: [
    solution1,
    reviewInsertionSort,
  ],
}
