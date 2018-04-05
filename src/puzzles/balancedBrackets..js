const { Stack } = require('../structures');

// Given a string expression, write an algorithm to determine if the
// balance and order of brackets and parentheses {}()[] is correct

// Ideas
// A) Use a stack to track openers. Given a balanced expression,
//    any time we encounter a closer, it should be paired with it's
//    opener from the top of the stack.


const A = (s, pairs) => {
  let stack = new Stack();

  for(let i = 0; i < s.length; i++) {
    let c = s[i];
    let pair = pairs.find(pair => pair[0] === c || pair[1] === c);

    if(!pair) continue;

    if(c === pair[0]) {
      stack.push(c);
    } else {
      let top = stack.pop();

      if(top !== pair[0]) return false;
    }
  }

  return stack.size === 0;
}
// Time: O(s*p) -> s = string length, p = number of pairs
// Space: O(1)

const tests = [
  '', // true
  '{', // false
  '}', // false
  '([{}{()}[]])', // true
  '([{{()}[}]])', // false
  'for(let i = 0; i < 10; i++) { let a = [0,1,2]; }' // true
];
const pairs = [
  ['(', ')'],
  ['{', '}'],
  ['[', ']'],
];

tests.forEach(test => {
  console.log(`A) Given '${test}' -> ${A(test, pairs)}`)
});
