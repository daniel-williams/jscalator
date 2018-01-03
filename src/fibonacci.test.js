var solutions = require('./fibonacci');

describe('testing fibonacci solutions', () => {
  it('should be an array of solutions', () => {
    expect(Array.isArray(solutions)).toBe(true);
  });

  solutions.forEach((x, i) => {
    describe(`testing solution # ${i + 1}`, () => {
      doTests(x);
    });
  });
});

function doTests(fibonacci) {
  it('should be a function', () => {
    expect(typeof fibonacci === 'function').toBe(true);
  });

  it('should throw given a negative number', () => {
    expect(() => {
      fibonacci(-1);
    }).toThrow();
  });

  it('should return 0 given 0', () => {
    expect(fibonacci(0)).toEqual(0);
  });

  it('should return 1 given 1', () => {
    expect(fibonacci(1)).toEqual(1);
  });

  it('should return the fibonacci of n', () => {
    expect(fibonacci(7)).toEqual(fibonacci(5) + fibonacci(6))
  });
}
