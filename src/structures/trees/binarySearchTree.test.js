const { BinarySearchTree } = require('./binarySearchTree');

const tree = new BinarySearchTree();
const values = [4,7,32,41,99,43,48,13,80,15,34,94,27,50];


describe('BinarySearchTree', () => {
  describe(`add(n) n -> ${values.join(', ')}`, () => {
    values.forEach(v => tree.add(v));

    it('should contain 14 nodes', () => {
      expect(tree.toArray().length === 14);
    });
  });

  describe('toArray()', () => {
    let result = tree.toArray();

    it('should return an Array', () => {
      expect(Array.isArray(result)).toBe(true);
    });

    it('should contain each original values', () => {
      expect(result.length === values.length);
      expect(result.every(v => values.includes(v))).toBe(true);
    });

    it('should be ordered asc', () => {
      for(let i = 1; i < result.length; i++) {
        expect(result[i - 1] <= result[i]).toBe(true);
      }
    });
  });
});
