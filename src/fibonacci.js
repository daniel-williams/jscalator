const solution1 = num => {
  if(typeof num !== 'number' || num < 0) {
    throw Error('expects argument to be a positive number');
  }

  return num === 0 || num === 1
    ? num
    : solution1(num - 1) + solution1(num - 2);
};

module.exports = [
  solution1,
];
