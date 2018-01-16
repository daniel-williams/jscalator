const { constants, solutions } = require('./priorityQueues');
const values = [
  {priority: 9, value: 9},
  {priority: 3, value: 3},
  {priority: 4, value: 4},
  {priority: 5, value: 5},
  {priority: 8, value: 8},
  {priority: 1, value: 1},
  {priority: 6, value: 6},
  {priority: 2, value: 2},
  {priority: 7, value: 7},
]

describe('testing priorityQueue solutions', () => {
  it('should contain an array of solutions', () => {
    expect(Array.isArray(solutions)).toBe(true);
  });

  solutions.forEach((PQ, i) => {
    describe(`testing solution #${i + 1}`, () => {
      let q = new PQ();

      it('should be newable and contain zero items', () => {
        expect(q instanceof PQ).toBe(true);
        expect(q.toArray.length).toEqual(0);
      });

      it('should insert new items in priority order', () => {
        q.insert(3);
        expect(q.toArray().length).toEqual(1);
        q.insert(6);
        expect(q.toArray().length).toEqual(2);
        q.insert(4);
        expect(q.toArray().length).toEqual(3);
      });

      it('should extract highest priority item first', () => {
        expect(q.extractMax().value).toEqual(6);
        expect(q.toArray().length).toEqual(2);
        expect(q.extractMax().value).toEqual(4);
        expect(q.toArray().length).toEqual(1);
        expect(q.extractMax().value).toEqual(3);
        expect(q.toArray().length).toEqual(0);

        expect(q.extractMax().value === undefined);
      });
    });
  });
});
