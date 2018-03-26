// given a string, check to see if it's a permutation of a palindrome
// space char doesn't seem to count and it's position is preversed in result (oh, bother!)

// ideas
// A) sort string, build two lists, singles & doubles
//    if singles.length > 1 return false
//    generate and return palindromes.

function A(s = '') {
  // seems reasonable that empty and single char strings would be a palindromes
  if(s.length < 1) { return [s]; }

  // lets work with an array of chars
  let a = s.split('');
  // remember the orginal position of all spaces
  let spaces = a.reduce((accum, x, i) => {
    if(x === ' ') { accum.push(i); }
    return accum;
  }, []);
  // filter out spaces and sort remaining chars
  let sorted = a.filter(x => x !== ' ').sort();
  let single = '';
  let doubles = [];

  // walk sorted chars and populate single value & doubles array
  for(let i = 0; i < sorted.length;) {
    if(!sorted[i + 1] || sorted[i] !== sorted[i + 1]) {
      if(single) {
        return false;
      }

      single = sorted[i++];
    } else if(sorted[i] === sorted[i + 1]) {
      doubles.push(sorted[i]);
      i += 2;
    }
  }

  // generate all permutations of chars in doubles
  let perms = generatePermutations(doubles);
  // generate palindrones w/preserved spaces
  let palindromes = perms.map(perm => {
    let prefix = perm.split('');
    let suffix = prefix.slice().reverse();
    let palindrome = single
      ? prefix.concat(single, suffix)
      : prefix.concat(suffix);

    // put back spaces
    spaces.forEach(index => {
      palindrome = [...palindrome.slice(0, index), ...[' '], ...palindrome.slice(index)];
    });

    return palindrome.join('');
  });

  return palindromes;
}

function generatePermutations(chars) {
  let result = [];

  helper(chars);

  return result;

  function helper(chars, prefix = '') {
    if(chars.length === 0) {
      result.push(prefix);
      return;
    }

    for(let i = 0; i < chars.length; i++) {
      // careful to not alter the chars and prefix in this closure
      helper([...chars.slice(0, i), ...chars.slice(i + 1)], prefix + chars[i]);
    }
  }
}


module.exports = {
  s1: A,
};

const tests = [
  '',
  'a',
  'ab',
  'aa',
  'a a',
  ' abab',
  'aabbb ',
  'aaabbb ',
  'abc bac',
  'ab cba c',
  'ab cdba c',
];

tests.forEach(x => {
  let result = A(x);

  console.log(`\r\nGiven the string '${x}':`);
  console.log(`Is a permutation of palindrome? ${!!result ? 'true' : 'false'}`)
  if(result) {
    console.log(`['${result.join(`', '`)}']`);
  }
});