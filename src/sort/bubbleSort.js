const solution1 = (a) => {
  let sorted = false;
  let result = a.slice();

  while(!sorted) {
    sorted = true;

    for(i = 0;i < result.length - 1; i++) {
      if(result[i] > result[i + 1]) {
        swap(result, i, i + 1);
        sorted = false;
      }
    }
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