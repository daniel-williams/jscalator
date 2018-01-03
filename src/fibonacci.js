const solution1 = num => {
  if(typeof num !== 'number' || num < 0) {
    throw Error('expects argument to be a positive number');
  }

  if(num === 0) {
    return 0;
  }

  if(num === 1) {
    return 1;
  }

  return solution1(num - 1) + solution1(num - 2);
};

module.exports = [
  solution1,
];
