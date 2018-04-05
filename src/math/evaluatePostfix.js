const { Stack } = require('../structures');

// Write an algorithm to evaluate a postfix expression

// Input
// '3 4 2 * + 1 - 2 /'

// Output
// 5

const A = (postFix) => {
  const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };
  const stack = new Stack();
  let chars = postFix.split(' ');

  chars.forEach(c => {
    if(!isNaN(parseFloat(c))) {
      stack.push(parseFloat(c));
    } else {
      let b = stack.pop();
      let a = stack.pop();

      stack.push(ops[c](a, b));
    }
  });

  return stack.pop();
};


const tests = [
  '3 4 2 * +',
  '3 4 2 * + 1 - 2 /',
];

tests.forEach(test => {
  console.log(`Given the postfix '${test}' -> ${A(test)}`);
});
