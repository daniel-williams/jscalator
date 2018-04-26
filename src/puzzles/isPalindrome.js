const A = (s) => {
  if(s.length < 2) { return true; }

  let mid = Math.floor(s.length);

  for(let left = 0, right = s.length - 1; left < mid; left++, right--) {
    if(s[left] !== s[right]) {
      return false;
    }
  }

  return true;
}

const tests = [
  '',
  'a',
  'aa',
  'ab',
  'aba',
  'abc',
  'abba',
  'tacocat',
];

tests.forEach(test => {
  console.log(`Given ${test} -> ${A(test)}`);
});
