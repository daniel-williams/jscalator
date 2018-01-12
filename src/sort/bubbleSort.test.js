const { constants, solutions } = require('./bubbleSort');

describe('testing bubbleSort solutions', () => {

  it('should be any array of solutions', () => {
    expect(Array.isArray(solutions)).toBe(true);
  });

  solutions.forEach((solution, i) => describe(`testing solution #${i + 1}`, () => doTests(solution)));
});

function doTests(fn) {
  const original = [34, 55, 120, 4, 19, 36, 49, 13, 100, 0, 99];

  it('should be a function', () => {
    expect(typeof fn).toEqual('function');
  });

  it('given an array, should return an Array', () => {
    const answer = fn(original);

    expect(Array.isArray(answer)).toBe(true);
  });

  it('returned array should be the same length as that passed in', () => {
    const answer = fn(original);

    expect(answer.length).toEqual(original.length);
  });

  it('should return array sorted in ascending order', () => {
    const answer = fn(original);

    for(i = 0; i < answer.length - 1; i++) {
      expect(answer[i + 1]).toBeGreaterThanOrEqual(answer[i]);
    }
  });
}