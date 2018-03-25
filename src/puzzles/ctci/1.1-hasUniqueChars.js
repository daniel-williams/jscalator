// determine if given string contains all unique character
// that is, no characters are repeated

// ideas
// A) walk chars and create map - O(n) time, O(n) space
// B) sort, then check for adjacent repeating character - O(n log(n)) time, O(1) space
// C) two pointers in nested loops to compare each char with every other char - O(n^2) time, O(1) space

function A(s) {
  let result = true;
  let charMap = {};

  s.split('').forEach(x => {
    if(charMap[x]) {
      result = false;
    } else {
      charMap[x] = true;
    }
  });

  return result;
}

function B(s) {
  let result = true;
  let sorted = s.split('').sort();

  for(let i = 1; i < sorted.length; i++) {
    if(sorted[i - 1] === sorted[i]) {
      result = false;
      break;
    }
  }

  return result;
}

function C(s) {
  for(let i = 0; i < s.length; i++) {
    for(let j = i + 1; j < s.length; j++) {
      if(s[i] === s[j]) {
        return false;
      }
    }
  }

  return true;
}

module.exports = {
  s1: A,
  s2: B,
  s3: C,
}

tests = [
  '',
  'abcdefghijklmnopqrstuvwxyz',
  'aabc',
  'abca',
  'oregon',
  'washington',
  'idaho',
  'utah',
];

tests.forEach(x => console.log(`'${x}' --> unique chars? ${B(x)}`));