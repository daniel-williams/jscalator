const { bin, createMask, getBit } = require('./helpers');

// Given a positive integer, print the next smallest and the next largest
// number that have the same number of 1 bits in their binary
// representation.

// Ideas
// A) Count 1s in binary version of n, then keep adding 1 to n until count
//    of 1s is equal to original count
// B) Flip right-most non-trailing zero to one, call this bit P. Count ones
//    to right of P, zero them out. Flip right most count - 1 zeros to one.

const A = (n) => {
  let next = prev = n;
  let originalCount = countOnes(n);

  do { next++; } while(countOnes(next) !== originalCount);
  do { prev--; } while(countOnes(prev) !== originalCount);

  return [next, prev];

  function countOnes(num) {
    return (num >>> 0).toString(2).split('').reduce((accum, n) => accum + +n, 0);
  }
};

const B = (n) => {
  let next, prev, mask;
  let i = count = 0;

  // Skip trailing zeros
  while(getBit(n, i) === 0) { i++; }
  // Count ones
  while(getBit(n, i) === 1) { i++; count++; }
  // Flip next zero
  next = n | (1 << i);
  // Apply a mask to zero out bits to right
  next = next & createMask(i);
  // Flip right-most count-1 zeros
  next = next | (1 << count - 1) - 1;

  // Reset index and count
  i = count = 0;

  // Find first occurance of zero
  while(getBit(n, i) !== 0) { i++; }
  // Find the very next one
  while(getBit(n, i) !== 1) { i++; }
  // Flip the one
  prev = n & ~(1 << i);
  // Flip left most zero preceeding it
  prev = prev | (1 << i - 1);

  return [next, prev];
};


const solutions = [
  A,
  B,
];
const tests = [
  13948,
  43,
  98372,
];

solutions.forEach((s, i) => {
  console.log('');
  console.log(`Solution #${i + 1}`);
  tests.forEach((test, j) => {
    console.log(`${j + 1}) Given ${test} (${bin(test)})`);
    s(test).forEach(n => {
      console.log(` -> ${n} (${bin(n)})`);
    });
  });
});
