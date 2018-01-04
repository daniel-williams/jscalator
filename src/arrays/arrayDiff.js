const a = [-5, 45, 33, 2, 2, 1, 99, -23, 234, 3, 129];
const b = [65, 4, 2, 99, 6, 25, 29, -5];

const solution1 = (a, b) => {
  let result = a.slice();

  b.forEach(x => {
    while(result.indexOf(x) >= 0) {
      result.splice(result.indexOf(x), 1);
    }
  });

  return result;
}

const solution2 = (a, b) => {
  return a.slice().filter(x => !b.includes(x));
}

module.exports = {
  constants: {
    a,
    b,
  },
  solutions: [
    solution1,
    solution2,
  ],
};
