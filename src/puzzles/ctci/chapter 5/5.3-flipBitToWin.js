// You have an integer and you can flip exactly one bit from a O to a 1.
// Write code to find the length of the longest sequence of 1 s you could
// create.

// Input
// 1775 (or: 11011101111)

// Output
// 8

// Ideas
// A) Starting at first 1, iterate through digits and count 1s and 0s,
//    pushing counts to array. Walking through array, odd indexes
//    seperated by an even index of 1 would indicate a possible flip.

const A = (n) => {
  let binArray = (n >>> 0).toString(2).split('');
  let countArray = [0, 1]; // prime to handle leading ones
  let countOnes = true;
  let count = 0;
  let result = 0;

  binArray.forEach(n => {
    if(countOnes && n == 0 || !countOnes && n == 1) {
      countArray.push(count);
      countOnes = !countOnes;
      count = 1;
    } else {
      count++;
    }
  });

  countArray.push(count); // collect last count

  if(countArray.length >= 3) {
    for(let i = 0; i < countArray.length - 2; i = i + 2) {
      if(countArray[i + 1] === 1) {
        result = Math.max(result, countArray[i] + countArray[i + 2] + 1);
      }
    }
  }

  return result;
};

const tests = [
  0,
  1,
  1775,
  2567,
  298347,
  Number.MAX_SAFE_INTEGER - 1,
  -343,
];

tests.forEach((test, i) => {
  console.log(`${i + 1}) Given ${test} (${bin(test)}) -> ${A(test)}`);
});

function bin(v) {
  return padLeft((v >>> 0).toString(2));
}

function padLeft(v, n = 32, c = '0') {
  if(v.length >= n) { return v; }

  return new Array(n - v.length).fill(c).join('') + v;
}
