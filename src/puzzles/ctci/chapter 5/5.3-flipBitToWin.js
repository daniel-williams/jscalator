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
// B) Right to left, process digits, keeping a count of contiguous ones.
//    If digit is zero, set previous count to current and recalculate max.

const A = (n) => {
  let binArray = (n >>> 0).toString(2).split('');
  let countArray = [];
  let countOnes = true;
  let count = 0;
  let maxCount = 0;

  binArray.forEach(n => {
    if(countOnes && n == 1 || !countOnes && n == 0) {
      count++;
    } else {
      countArray.push(count);
      countOnes = !countOnes;
      count = 1;
    }
  });

  if(countOnes) { countArray.push(count); } // collect last count

  // odd indexes are count of ones, even are count of zeros
  if(countArray.length) {
    for(let i = 0; i < countArray.length; i = i + 2) {
      let previous = i >= 2 && countArray[i - 1] === 1
        ? countArray[i - 2]
        : 0;

      maxCount = Math.max(maxCount, 1 + previous + countArray[i]);
    }
  }

  return maxCount;
};

const B = (n) => {
  let currentCount = 0;
  let previousCount = 0;
  let maxCount = 0;

  const updateMax = () => maxCount = Math.max(maxCount, 1 + currentCount + previousCount);

  while(n !== 0) {
    if((n & 1) === 0) {
      updateMax();
      previousCount = currentCount;
      currentCount = 0;
    } else {
      currentCount++;
    }

    n >>>= 1;
  }

  updateMax();

  return maxCount;
}

const solutions = [A, B];
const tests = [
  0,
  1,
  1775,
  2567,
  298347,
  Number.MAX_SAFE_INTEGER - 1,
  -343,
];

solutions.forEach((s, i) => {
  console.log('');
  console.log(`Solution #${i + 1}`);
  tests.forEach((test, j) => {
    console.log(`${j + 1}) Given ${test} (${bin(test)}) -> ${s(test)}`);
  });
});

function bin(v) {
  return padLeft((v >>> 0).toString(2));
}

function padLeft(v, n = 32, c = '0') {
  if(v.length >= n) { return v; }

  return new Array(n - v.length).fill(c).join('') + v;
}
