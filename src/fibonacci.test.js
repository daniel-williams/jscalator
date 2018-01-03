var solutions = require('./fibonacci');

describe('testing fibonacci solutions', () => {
  it('should be an array of solutions', () => {
    expect(Array.isArray(solutions)).toBe(true);
  });

  solutions.forEach((x, i) => {
    describe(`testing solution #${i + 1}`, () => {
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

  it('fibonacci(0) should return 0', () => {
    expect(fibonacci(0)).toEqual(0);
  });

  it('fibonacci(1) should return 1', () => {
    expect(fibonacci(1)).toEqual(1);
  });

  it('fibonacci(n) should return (fibonacci(n - 1) + fibonacci(n - 2))', () => {
    const n = 8;

    expect(fibonacci(n)).toEqual(fibonacci(n - 1) + fibonacci(n - 2))
  });
}
