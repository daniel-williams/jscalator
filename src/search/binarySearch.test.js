const { constants, solutions } = require('./binarySearch');
const a = Array(100).fill(0).map((x, i) => i);


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
  it('should be a function', () => {
    expect(typeof fn === 'function').toBe(true);
  });

  it('should fail when array is empty', () => {
    expect(fn([], 0)).toBe(false);
  });

  it('should find first element', () => {
    expect(fn(a, a[0])).toBe(true);
  });

  it('should find last element', () => {
    expect(fn(a, a[99])).toBe(true);
  });

  it('should find random values we know exist', () => {
    const values = Array(10).fill(0).map(x => Math.floor(Math.random() * 100));

    values.forEach(x => expect(fn(a, x)).toBe(true));
  });

  it('should fail to find values we know do not exist', () => {
    const values = [-1, -50, 100];

    values.forEach(x => expect(fn(a, x)).toBe(false));
  });
}