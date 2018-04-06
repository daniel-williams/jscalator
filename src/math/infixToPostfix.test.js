const { solutions } = require('./infixToPostfix');

const tests = [
  ['3 + 4 * 2', '3 4 2 * +'],
  ['( 3 + 4 * 2 - 1 ) / 2', '3 4 2 * + 1 - 2 /'],
];

describe('testing infixToPostfix', () => {
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
