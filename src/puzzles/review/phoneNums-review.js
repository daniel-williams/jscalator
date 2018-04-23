function getCharMaps(phoneNumber) {
  let numToCharMap = [
    [], // 0
    [], // 1
    ['A', 'B', 'C'], // 2
    ['D', 'E', 'F'], // 3
    ['G', 'H', 'I'], // 4
    ['J', 'K', 'L'], // 5
    ['M', 'N', 'O'], // 6
    ['P', 'Q', 'R', 'S'], // 7
    ['T', 'U', 'V'], // 8
    ['W', 'X', 'Y', 'Z'], // 9
  ];

  return findMappedWords(toMappedNumArray(phoneNumber));

  function findMappedWords(mappedNumArray, prefix = '', result = []) {
    if(mappedNumArray.length === 0) {
      result.push(prefix);
    } else {
      numToCharMap[mappedNumArray[0]].forEach(char => {
        findMappedWords(mappedNumArray.slice(1), prefix + char, result);
      });
    }

    return result;
  }

  function toMappedNumArray(phoneNumber) {
    return (phoneNumber).toString()
      .split('')
      .filter(c => {
        return !isNaN(parseInt(c)) && c !== '0' && c !== '1';
      })
      .map(c => parseInt(c));
  }
}

const tests = [
  234,
  '230-1104',
];

tests.forEach(test => {
  let result = getCharMaps(test);
  console.log(`Given '${test}' -> (${result.length}) [${result.slice(0,30).join(',')}]`);
});
