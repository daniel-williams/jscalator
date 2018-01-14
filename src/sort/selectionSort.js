// succesive passes identify (select) largest value and then swap to end of unsorted portion of array

const solution1 = (a) => {
  let result = a.slice();

  for(let i = result.length - 1; i >= 0; i--) {
    let target = 0;

    for(let j = 0; j <= i; j++) {
      if(result[j] > result[target]) {
        target = j;
      }
    }
    swap(result, target, i);
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
  ]
}