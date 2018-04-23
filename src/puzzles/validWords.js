// Given a string of characters, write a function to determine
// if the string consists of only valid words;
// where the sequence of characters does not contain any spaces,
// e.g. isValidWords("catdogmouse") => true
// e.g. isValidWords("catsup") => true

const isValidWords = (words, list) => {
  if (!words.length) return true;
  let lastIndexMatched = 0;

  for (let i = 0; i <= words.length; i++) {
    if (list.includes(words.substring(0, i))) {
      lastIndexMatched = i;
      // branch
      if(isValidWords(words.substring(lastIndexMatched), list)) {
        return true;
      }
    }
  }

  return lastIndexMatched === words.length - 1;
}

const list = [
  'cat',
  'dog',
  'mouse',
  'up',
  'cats'
];
const tests = [
  ['', list],
  ['catsup', list],
  ['catdogmouse', list],
  ['catdogsup', list],
];

tests.forEach(test => {
  console.log(`Given ${test[0]} -> ${isValidWords(...test)}`);
});
