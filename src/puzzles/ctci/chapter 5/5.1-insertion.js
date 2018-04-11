// You are given two 32-bit numbers, N and M, and two bit positions, i and j. Write a
// method to insert M into N such that M starts at bit j and ends at bit i. You can
// assume that the bits j through i have enough space to fit all of M. That is, if
// M = 10011, you can assume that there are at least 5 bits between j and i. You
// would not, fo example, have j = 3 and i = 2, because M could not fully fit between
// bit 3 and bit 2.

// Input
// N = 10000000000, M = 10011, i = 2, j = 6

// Output
// 10001001100

// A) create a mask containing 1s with bits from i to j (inclusive)
//    set to 0s. Bitwise AND the mask with N. Left shift M by i bits and
//    bitwise OR with N.

const A = (n, m, i, j) => {
  let mask = (~0 << j + i) | ((1 << i) - 1);

  return (n & mask) | (m << i);
};

const tests = [
  [0b10000000000, 0b10011, 2, 6],
];

tests.forEach((test, i) => {
  let result = A(...test);

  console.log(`${i + 1}) Given [${bin(test[0])}, ${bin(test[1])}, ${test[2]}, ${test[3]}] -> ${bin(result)}`);
});

function bin(v) {
  return (v >>> 0).toString(2);
}
