// A child is running up a staircase with n steps and can hop either 1 step,
// 2 steps, or 3 steps at a time. Implement a method to count how many
// possible ways the child can run up the stairs.

function A(remainingStairCount, options) {
  if(!remainingStairCount) { return 0; }

  let possibleWays = 0;

  helper(remainingStairCount);

  return possibleWays;

  function helper(remainingStairCount) {
    if(remainingStairCount === 0) {
      possibleWays++;
      return;
    }

    options.forEach(opt => {
      if(remainingStairCount - opt >= 0) {
        helper(remainingStairCount - opt);
      }
    });
  }
}

function B(totalStairCount, options) {
  if(totalStairCount <= 0) { return 0; }

  return helper(totalStairCount);

  function helper(remainingStairCount) {
    return remainingStairCount < 0
      ? 0
      : remainingStairCount === 0
        ? 1
        : options.reduce((accum, opt) => {
            return accum + helper(remainingStairCount - opt);
          }, 0);
  }
}

module.exports = {};

const options = [1, 2, 3];
const solutions = [A, B];
const tests = [
  [0, options],
  [1, options],
  [2, options],
  [3, options],
  [4, options],
];

solutions.forEach((s, i) => {
  console.log('');
  console.log(`Solution #${i + 1}`)
  tests.forEach((test, j) => {
    console.log(`${j + 1}) Given ${test[0]} stairs -> ${s(...test)} possible ways exit`);
  });
});
