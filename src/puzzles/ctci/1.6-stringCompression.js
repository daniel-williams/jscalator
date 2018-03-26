// Implement a function to perform basic string compression
// using the counts of repeated characters. For example,
// aabcccccbbaaa -> a2bc5b2a3

// Ideas
// A) Walk through the string, pushing tubples onto an array, where
//    each tuple contains char and count (e.g., ['a', '3']). Then we can
//    reduce the tuples into a compressed string. O(n) time, O(n) space

function A(s) {
  if(s.length < 3) { return s; }

  let tuples = [];
  let i = 0;
  let char = s[i];
  let count = 1;

  i++;

  while(i < s.length) {
    if(s[i] === char) {
      count++;
    } else {
      tuples.push([char, count]);
      char = s[i];
      count = 1;
    }
    i++;
  }

  tuples.push([char, count]);

  return tuples.reduce((accum, x) => {
    return x[1] === 1
      ? accum + x[0]
      : x[1] === 2
        ? accum + x[0] + x[0]
        : accum + x[1] + x[0];
  }, '');
}

module.exports = {
  s1: A,
};

const tests = [
  '',
  'a',
  'aa',
  'aaa',
  'abcdefg',
  'aabbcc',
  'aaabbbccc',
  'aabcccccbbbaa',
];

tests.forEach(x => console.log(`${x} -> ${A(x)}`));
