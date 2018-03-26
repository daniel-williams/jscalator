// Assume you have a method isSubstring which checks if one word is a substring
// of another. Given two strings, sl and s2, write code to check if s2 is a
// rotation of sl using only one call to isSubstring
// (e.g., "waterbottle" is a rotation of"erbottlewat")

// Ideas
// Compare lengths, then call isSubstring(s1 + s1, s2)

// Exmaple
// isSubstring('waterbottlewaterbottle', 'erbottlewat')

function A(s1, s2) {
  if(s1.length !== s2.length) { return false; }

  return isSubstring(s1 + s1, s2);
}


function isSubstring(s1, s2) {
  return s1.includes(s2);
}

module.exports = {
  s1: A,
};


const tests = [
  ['waterbottle', 'erbottlewat'],
  ['waterbottle', 'erbotzlewat'],
  ['abc', 'bac'],
  ['aaa', 'aaaa'],
];

tests.forEach(x => console.log(`Given ${x[0]} & ${x[1]} -> ${A(...x)}`));
