// determine if given string contains all unique character
// that is, no characters are repeated

// ideas
// 1) walk chars and create map - O(n) time, O(n) space
// 2) sort, then check for adjacent repeating character - O(n log(n)) time, O(1) space
// 3) two pointers in nested loops to compare each char with every other char - O(n^2) time, O(1) space

function solution1(s) {
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

function solution2(s) {
  let result = true;
  let sorted = s.split('').sort().join('');

  for(let i = 0; i < sorted.length - 2; i++) {
    if(sorted[i] === sorted[i + 1]) {
      result = false;
      break;
    }
  }

  return result;
}

function solution3(s) {
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
  s1: solution1,
  s2: solution2,
  s3: solution3,
}