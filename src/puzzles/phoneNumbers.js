
const keyToLetterMap = [
  [], // 0
  [], // 1
  ['A', 'B', 'C'], // 2
  ['D', 'E', 'F'], // 3
  ['G', 'H', 'I'], // 4
  ['J', 'K', 'L'], // 5
  ['M', 'N', 'O'], // 6
  ['P', 'Q', 'R', 'S'], // 7
  ['T', 'U', 'V'], // 8
  ['W', 'X', 'Y', 'Z'], // 9
];
const num = 2067934851;

const solution1 = phoneNumber => {
  let result = [];
  const nums = phoneNumber.toString().split('');

  const genCombinations = (nums, prefix) => {
    if(nums.length === 0) {
      result.push(prefix);
      return;
    }

    const letters = keyToLetterMap[nums[0]];

    if(letters.length) {
      letters.forEach(x => {
        const nextPrefix = prefix + x;
        const nextNums = nums.slice();

        nextNums.splice(0, 1);
        genCombinations(nextNums, nextPrefix);
      });
    } else {
      const nextPrefix = prefix;
      const nextNums = nums.slice();

      nextNums.splice(0, 1);
      genCombinations(nextNums, nextPrefix);
    }
  };

  genCombinations(nums, '');

  return result;
};

const solution2 = phoneNumber => {
  const result = [];
  const digits = phoneNumber.toString().split('').map(Number);

  function fn(a, prefix) {
    if(a.length === 0 && prefix) {
      result.push(prefix);
      return;
    }

    const letters = keyToLetterMap[a[0]];
    const nextDigits = a.slice(1);

    if(letters.length === 0) {
      fn(nextDigits, prefix);
    }

    letters.forEach(l => fn(nextDigits, prefix + l));
  }

  fn(digits, '');

  return result;
}

module.exports = {
  constants: {
    keyToLetterMap,
    num,
  },
  solutions: [
    solution1,
    solution2,
  ],
};


