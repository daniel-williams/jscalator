const { constants, solutions } = require('./phoneNumbers');
const { num, keyToLetterMap } = constants;


describe('testing solutions', () => {
  it('should be an array of solutions', () => {
    expect(Array.isArray(solutions)).toBe(true);
  });

  solutions.forEach((x, i) => {
    describe(`testing solution #${i + 1}`, () => {
      doTests(x);
    });
  });
});

function doTests(genCombinations) {
  it('should be a function', () => {
    expect(typeof genCombinations === 'function').toBe(true);
  });

  const result = genCombinations(num);

  it('should return a array', () => {
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return the correct number of combinations', () => {
    const combinationCount = calculateCombinationsCount(num);

    expect(result.length).toEqual(combinationCount);
  });

  it('should contain unique combinations', () => {
    expect(containsUniqueItems(result)).toBe(true);
  })
}

function calculateCombinationsCount(num) {
  const counts = num.toString().split('').map(x => keyToLetterMap[parseInt(x)].length);

  return counts.reduce((total, count) => {
    if(total === 0) {
      total = count;
    } else if(count > 0) {
      total *= count;
    }

    return total;
  }, 0);
}

function containsUniqueItems(a) {
  let obj = {};

  a.forEach(x => {
    if(obj[x]) {
      return false;
    } else {
      obj[x] = true;
    }
  });

  return true;
}