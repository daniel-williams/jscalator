const { bin } = require('./helpers');

// Write a function to determine the number of bits you would need to flip to
// convert integer A to integer B.

// Input
// 29 (or: 11101), 15 (or: 01111)

// Output
// 2

// Ideas
// A) Using a mask, iterate and compare each bit
// B) XOR a and b will result in a single number where 1 bits represent
//    differences. Use a mask to iterate and count 1s

const A = (a, b) => {
  let count = 0;
  let mask = 1;

  while(a !== 0 || b !== 0) {
    let bitA = a & mask;
    let bitB = b & mask;

    if((a === 0 && bitB) || (b === 0 && bitA) || bitA !== bitB) { count++; }

    a >>>= 1;
    b >>>= 1;
  }

  return count;
};

const B = (a, b) => {
  let count = 0;
  let mask = 1;

  for(let result = a ^ b; result > 0; result >>>= 1) {
    count += result & mask;
  }

  return count;
}

const solutions = [
  A,
  B,
];
const tests = [
  [29, 15],
  [2845, 629],
  [45, 10675],
];

solutions.forEach((s, i) => {
  console.log('');
  console.log(`Solution #${i + 1}`);
  tests.forEach((test, j) => {
    console.log(`${j + 1}) Given [${test.join(',')}] -> ${s(...test)}`);
    console.log(`   ${bin(test[0])} = ${test[0]}`);
    console.log(`   ${bin(test[1])} = ${test[1]}`);
  });
});
