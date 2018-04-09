const { BinaryTree, BinaryTreeNode } = require('./binaryTree');

const tree = new BinaryTree();
const values = [1,2,3,4,5,6,7,8,9];
//        1
//    2       3
//  4   5   6   7
// 8 9

describe('BinaryTree', () => {
  describe(`insert(n) n -> ${values.join(', ')}`, () => {
    values.forEach(v => tree.insert(v));

    it(`should contain ${values.length} nodes`, () => {
      expect(tree.toArray().length === values.length);
    });
  });

  describe('toArray()', () => {
    let result = tree.toArray().map(n => n.value);

    it('should return an Array', () => {
      expect(Array.isArray(result)).toBe(true);
    });

    it('should contain each original value', () => {
      expect(result.length === values.length);
      expect(result.every(v => values.includes(v))).toBe(true);
    });
  });

  describe('visitNodesInBF()', () => {
    let result = [];
    tree.visitNodesBF(n => result.push(n.value));

    it('should be in original array order', () => {
      for(let i = 0; i < values.length; i++) {
        expect(result[i]).toEqual(values[i]);
      }
    });
  });
});
