const { constants, solutions } = require('./priorityQueues');
const values = [2, 15, 29, 4, 17, 99, -45, 0, 10, 13];

describe('testing priorityQueue solutions', () => {
  it('should contain an array of solutions', () => {
    expect(Array.isArray(solutions)).toBe(true);
  });

  solutions.forEach((PQ, i) => {
    describe(`testing solution #${i + 1}`, () => {
      it('should be newable with zero params', () => {
        let q = new PQ();

        expect(q instanceof PQ).toBe(true);
        expect(q.toArray().length).toEqual(0);
        expect(q.extractMax()).toBeNull();
      });


      it('should be able to insert items and maintain priority order', () => {
        let q = new PQ();

        expect(q instanceof PQ).toBe(true);
        expect(q.toArray().length).toEqual(0);

        q.insert(4);
        q.insert(14);
        q.insert(-3);
        q.insert(0);

        expect(q.toArray().length).toEqual(4);
        expect(q.extractMax().value).toEqual(14);
        expect(q.extractMax().value).toEqual(4);
        expect(q.extractMax().value).toEqual(0);
        expect(q.extractMax().value).toEqual(-3);
        expect(q.extractMax()).toBeNull();
      });

      it('should be newable with array of values', () => {
        let q = new PQ(values);

        expect(q instanceof PQ).toBe(true);
        expect(q.toArray().length).toEqual(values.length);
      });

      it('should extract largest remaining value', () => {
        let q = new PQ(values);
        let sorted = values.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);

        sorted.forEach(n => {
          expect(q.extractMax().value).toEqual(n);
        });

        expect(q.extractMax()).toBeNull();
      });
    });
  });
});
