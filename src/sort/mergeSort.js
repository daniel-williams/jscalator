// recursively split array into left/right, merge the sorted halves and return

const solution1 = (a) => {
  function helper(a) {
    if(a.length <= 1) { return a; }

    const mid = Math.ceil(a.length / 2);
    let left = helper(a.slice(0, mid));
    let right = helper(a.slice(mid));

    return mergeArrays(left, right);
  }

  return helper(a.slice());
}

function mergeArrays(a, b) {
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

module.exports = {
  constants: {},
  solutions: [
    solution1,
  ],
};
