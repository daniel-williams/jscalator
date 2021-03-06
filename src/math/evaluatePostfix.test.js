const { solutions } = require('./evaluatePostfix');

const tests = [
  ['3 4 2 * +', 11],
  ['3 4 2 * + 1 - 2 /', 5],
];

describe('testing evaluatePostfix', () => {
  it('should contain solutions', () => expect(Array.isArray(solutions)).toBe(true));

  solutions.forEach((solution, i) => {
    describe(`testing solution #${i + 1}`, () => {
        it('should be a function', () => {
            expect(typeof solution).toEqual('function');
        });

        doTests(solution);
    });
  });
});

function doTests(fn) {
  tests.forEach(test => {
    it(`Given '${test[0]}', expect ${test[1]}`, () => {
      expect(fn(test[0])).toEqual(test[1]);
    });
  });
}
