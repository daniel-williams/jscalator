const { Stack } = require('../structures');

// Given an infix expression, convert it to a postfix expression

// Input
// '(3 + 4 * 2 - 1) / 2'
// '3 4 2 * + 1 - 2 /'

const A = (infix) => {
  const opPrec = {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1,
  };
  const inChars = infix.split(' ');
  const stack = new Stack();
  let postfix = [];

  inChars.forEach(c => {
    if(!isNaN(parseFloat(c))) {
      postfix.push(c);
    } else if(c === ')') {
      while(!stack.isEmpty() && stack.peek() !== '(') {
        postfix.push(stack.pop());
      }

      if(stack.peek() === '(') { stack.pop(); }
    } else {
      while(!stack.isEmpty()) {
        let top = stack.peek();

        if(top === '(') { break; }

        if(opPrec[stack.peek()] >= opPrec[c]) {
          postfix.push(stack.pop());
        } else {
          break;
        }
      }
      stack.push(c);
    }
  });

  while(!stack.isEmpty()) {
    postfix.push(stack.pop());
  }

  return postfix.join(' ');
};


module.exports = {
  solutions: [
    A,
  ],
};
