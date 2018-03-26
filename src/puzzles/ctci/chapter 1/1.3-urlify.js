// given a char array as input, return a charater array with all
// spaces replaced with %20

// ideas
// A) count spaces and determine length of new array
//    using two pointers and iterating backwards though given array
//    shift char to back pointer, when char is space, insert three
//    replacement chars

function A(chars) {
  if(!chars || !chars.length) { return chars; }

  let spaceCount = chars.reduce((accum, x) => {
    return accum += x === ' ' ? 1 : 0;
  }, 0);
  let newLength = chars.length + (2 * spaceCount);

  for(let i = chars.length - 1, j = newLength - 1; i >= 0; i--) {
    if(chars[i] !== ' ') {
      chars[j--] = chars[i];
    } else {
      chars[j--] = '0';
      chars[j--] = '2';
      chars[j--] = '%';
    }
  }

  return chars;
}

module.exports = {
  s1: A
}

let tests = [
  [],
  [' '],
  ['d', 'a', 'n', 'i', 'e', 'l'],
  ['d', 'a', ' ', 'n', 'i', ' ', 'e', 'l'],
  [' ', 'a', ' ', ' ', 'b', 'c', ' '],
];

tests.forEach(x => console.log(`[${x}] --> [${A(x)}]\r\n`));
