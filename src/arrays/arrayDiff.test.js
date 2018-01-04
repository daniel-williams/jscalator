const { constants, solutions } = require('./arrayDiff');
const { a, b } = constants;


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


function doTests(fn) {
  const result = fn(a, b);

  it('should return an array', () => {
    expect(Array.isArray(result)).toBe(true);
  });

  it('should not contain any values from array b', () => {
    expect(b.some(x => result.includes(x))).toBe(false);
  });

  it('should contain every value from array a', () => {
    expect(result.every(x => a.includes(x))).toBe(true);
  });
}
