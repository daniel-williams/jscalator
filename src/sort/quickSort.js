function solution1(a) {
  let result = a.slice();

  helper(result);

  function helper(a, first, last) {
    let firstIndex = first || 0;
    let lastIndex = last || a.length - 1;
    let swapIndex = firstIndex - 1;

    if(last - first <= 1) { return; } // exit condition

    for(let i = firstIndex; i <= lastIndex; i++) {
      if(a[i] < a[lastIndex]) {
        swapIndex++;
        swap(a, swapIndex, i);
      }
    }

    swap(a, swapIndex + 1, lastIndex); // index at (swap + 1) becomes sorted
    // divide and conquer
    helper(a, firstIndex, swapIndex);
    helper(a, swapIndex + 2, lastIndex);
  }

  return result;
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
  ],
};
