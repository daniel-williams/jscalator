const { bin } = require('./helpers');

// Write a program to swap odd and even bits in an integer with as few
// instructions as possible (e.g., bit O and bit 1 are swapped, bit 2
// and bit 3 are swapped, and so on).

// Ideas
// A) Make and apply even and odd masks to original number, generating an
//    evenResult and and oddResult, bit shift and merge to form final result


const A = (n) => {
  let evenMask = oddMask = 0;

  for(let i = 0; i < 32; i++) {
    if(i % 2) {
      oddMask |= (1 << i);
    } else {
      evenMask |= (1 << i);
    }
  }

  return ((n & evenMask) << 1) | ((n & oddMask) >>> 1);
};

const solutions = [
  A,
];
const tests = [
  43,
  117,
  893271,
];

solutions.forEach((s, i) => {
  console.log('');
  console.log(`Solution #${i + 1}`);
  tests.forEach((test, j) => {
    let result = s(test);

    console.log(`${j + 1}) Given ${test} -> ${result}`);
    console.log(`   ${bin(test)} = ${test}`);
    console.log(`   ${bin(result)} = ${result}`);
  });
});
