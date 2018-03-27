// move lower/higher values to left/right of a pivot (pivot becomes sorted),
// recurse on lower and higher segments

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

const reviewQuickSort = (a, left = null, right = null) => {
  left = left || 0;
  right = right || a.length - 1;

  if(right > left) {
    let partionIndex = reviewPartition(a, left, right);

    reviewQuickSort(a, left, partionIndex - 1);
    reviewQuickSort(a, partionIndex + 1, right);
  }

  return a;
}

const reviewPartition = (a, left, right) => {
  let pivot = right;
  let pivotIndex = left;

  for(let i = left; i < pivot; i++) {
    if(a[i] <= a[pivot]) {
      swap(a, i, pivotIndex);
      pivotIndex++;
    }
  }

  // swap pivot into final position
  swap(a, pivot, pivotIndex);

  return pivotIndex;
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
    reviewQuickSort,
  ],
};
