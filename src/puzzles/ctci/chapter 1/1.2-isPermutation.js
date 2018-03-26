// given two strings, determine if string A is a permutation of string B

// ideas
// a) construct a list B perumations, checking each against A - O(B!*B) time, O(B!) space
// b) for each character in A, check and remove from B - O(AB) time, O(B) space

function B(a, b) {
  let bChars = b.split('');

  for(let i = 0; i < a.length; i++) {
    let char = a[i];

    if(!bChars.includes(char)) {
      return false;
    } else {
      bChars.splice(bChars.indexOf(char), 1);
    }
  }

  return true;
}


module.exports = {
  s1: B,
};

const tests = [
  ['a', 'abc'],
  ['z', 'abc'],
  ['ac', 'abc'],
  ['abc', 'abc'],
  ['abca', 'abc'],
  ['abcabc', 'aabbcc'],
  ['aabbccc', 'aabbcc'],
];

tests.forEach(x => console.log(`${x[0]}, ${x[1]} -> ${B(...x)}`));
