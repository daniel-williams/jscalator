// Calculations using functions

// Examples:

// seven(times(five())); // must return 35
// four(plus(nine())); // must return 13
// eight(minus(three())); // must return 5
// six(divide(two())); // must return 3

// Requirements:

// There must be a function for each number from 0 ("zero") to 9 ("nine")
// There must be a function for each of the following mathematical
//   operations: plus, minus, times, divide
// Each calculation consist of exactly one operation and two numbers
// The most outer function represents the left operand, the most inner
//   function represents the right operand

const plus = a => b => b + a;
const minus = a => b => b - a;
const times = a => b => b * a;
const divide = a => b => b / a;

const zero = f => f ? f(0) : 0;
const one = f => f ? f(1) : 1;
const two = f => f ? f(2) : 2;
const three = f => f ? f(3) : 3;
const four = f => f ? f(4) : 4;
const five = f => f ? f(5) : 5;
const six = f => f ? f(6) : 6;
const seven = f => f ? f(7) : 7;
const eight = f => f ? f(8) : 8;
const nine = f => f ? f(9) : 9;

const tests = [
  [() => seven(times(five())), 35],
  [() => four(plus(nine())), 13],
  [() => eight(minus(three())), 5],
  [() => six(divide(two())), 3],
  [() => one(plus(two(plus(three())))), 6],
];

tests.forEach(test => {
  console.log(`Given ${test[0].toString().substring(6)} -> ${test[0]()} = ${test[1]}`)
});
