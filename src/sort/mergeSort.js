// recursively split array into left/right, merge the sorted halves and return

const solution2 = (a) => {
  const mid = Math.floor(a.length / 2);

  if(mid > 0) {
    return solution2Merge(solution2(a.slice(0, mid)), solution2(a.slice(mid)));
  }

  return a;
}

const solution2Merge = (l, r) => {
  const len = l.length + r.length;
  let ri = li = 0;
  let result = [];

  r.push(Number.POSITIVE_INFINITY);
  l.push(Number.POSITIVE_INFINITY);

  for(let i = 0; i < len; i++) {
    if(r[ri] < l[li]) {
      result.push(r[ri++]);
    } else {
      result.push(l[li++]);
    }
  }

  return result;
}


const solution1 = (a) => {
  function helper(a) {
    if(a.length <= 1) { return a; }

    const mid = Math.ceil(a.length / 2);
    let left = helper(a.slice(0, mid));
    let right = helper(a.slice(mid));

    return solution1Merge(left, right);
  }

  return helper(a.slice());
}

function solution1Merge(a, b) {
  let result = Array(a.length + b.length);
  let ai = 0;
  let bi = 0;

  for(let i = 0; i < result.length; i++) {
    if(a[ai] === undefined) {
      result[i] = b[bi];
      bi++;
    } else if(b[bi] === undefined) {
      result[i] = a[ai];
      ai++;
    }
    else if(a[ai] <= b[bi]) {
      result[i] = a[ai];
      ai++;
    } else {
      result[i] = b[bi];
      bi++;
    }
  }

  return result;
}

const reviewMergeSort = (a) => {
  if(a.length < 2) { return a; }

  let mid = Math.floor(a.length / 2);
  let left = a.slice(0, mid);
  let right = a.slice(mid);

  return reviewMerge(reviewMergeSort(left), reviewMergeSort(right));
}

const reviewMerge = (left, right) => {
  let result = [];
  let l = 0;
  let r = 0;

  while(l < left.length && r < right.length) {
    if(left[l] < right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }

  return result.concat(left.slice(l), right.slice(r));
}

module.exports = {
  constants: {},
  solutions: [
    solution1,
    solution2,
    reviewMergeSort,
  ],
};
