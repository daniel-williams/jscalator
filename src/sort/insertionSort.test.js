const { constants, solutions } = require('./insertionSort');
// test with zero, positives, negatives, opposites, and duplicates
const original = [34, 55, 120, 49, 4, -19, 19, 36, 49, 13, 100, 0, 99];

describe('testing insertionSort solutions', () => {
  it('should be any array of solutions', () => {
    expect(Array.isArray(solutions)).toBe(true);
  });

  solutions.forEach((solution, i) => {
    describe(`testing solution #${i + 1}`, () => {
      doTests(solution, original);
    })
  });
});

function doTests(fn, original) {
  it('should be a function', () => expect(typeof fn).toEqual('function'));

  const answer = fn(original);

  it('given an array, should return an Array', () => expect(Array.isArray(answer)).toBe(true));

  it('returned array should be the same length as that passed in', () => expect(answer.length).toEqual(original.length));

  it('should only contain values from original array', () => {
    expect(answer.every(x => original.includes(x))).toBe(true);
  });

  it('should include every value from original array', () => {
    expect(original.every(x => answer.includes(x))).toBe(true);
  });

  it('should return array sorted in ascending order', () => {
    for(i = 0; i < answer.length - 1; i++) {
      expect(answer[i + 1]).toBeGreaterThanOrEqual(answer[i]);
    }
  });
}