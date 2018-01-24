const { constants, solutions } = require('./isPrime');
const tests = [
    [-19, false],
    ['wtf', false],
    [0, false],
    [1, false],
    [2, true],
    [3, true],
    [4, false],
    [5, true],
    [9, false],
    [21, false],
    [157, true],
    [829, true],
    [847, false],
    [15227, true],
    [15230, false],
];

describe('testing primes solutions', () => {
    it('should contain an array of solutions', () => {
        expect(Array.isArray(solutions)).toBe(true);
    });

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
    tests.forEach(([num, result]) => {
        it(`given ${num}, expect result to be ${result}`, () => {
            expect(fn(num)).toBe(result);
        });
    });
}