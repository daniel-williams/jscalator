const { BinaryTree, BinaryTreeNode } = require('./binaryTree');


describe('BinaryTree', () => {
  let tree;
  const VALUES = [1,2,3,4,5,6,7,8,9,10,11];

//        1
//    2       3
//  4   5   6   7
// 8 9 1011

  describe(`insert(n) -> n of [${VALUES.join(', ')}]`, () => {
    beforeAll(() => {
      tree = new BinaryTree();
      VALUES.forEach(v => tree.insert(v));
    });

    it(`tree should contain ${VALUES.length} nodes`, () => {
      expect(tree.toArray().length).toEqual(VALUES.length);
    });
  });

  describe('treeHeight', () => {
    beforeAll(() => {
      tree = new BinaryTree();
      VALUES.forEach(v => tree.insert(v));
    });

    it('should return correct height', () => {
      expect(tree.treeHeight).toEqual(Math.floor(Math.log2(VALUES.length)));
    });
  });

  describe('find()', () => {
    beforeAll(() => {
      tree = new BinaryTree();
      VALUES.forEach(v => tree.insert(v));
    });

    it('should return TreeNode when given a valid value', () => {
      let node = tree.find(8);

      expect(node instanceof BinaryTreeNode).toBe(true);
      expect(node.value).toEqual(8);
    });

    it('should return null when given an invalid value', () => {
      let node = tree.find(13);

      expect(node).toBeNull();
    });
  });

  describe('remove()', () => {
    beforeEach(() => {
      tree = new BinaryTree();
      VALUES.forEach(v => tree.insert(v));
    });

    it('should remove correct node when given a valid value', () => {
      tree.remove(8);
      let node = tree.find(8);

      expect(node).toBeNull();
    });

    it('should correctly remove root node', () => {
      let beginRoot = tree._root;
      let beginLeft = beginRoot.left;
      let beginRight = beginRoot.right;
      let expectedHeight = beginLeft.height + beginRight.height + 1;

      tree.remove(beginRoot.value);

      let removedRoot = tree.find(beginRoot.value);
      let endRoot = tree._root;
      // todo: derive this node (8) from existing tree via BFT
      let eight = tree.find(8);
      let nodes = tree.toArray();

      expect(removedRoot).toBeNull();
      expect(endRoot.value).toEqual(beginLeft.value);
      expect(eight.left).not.toBeNull();
      expect(eight.left.value).toEqual(beginRight.value);
      expect(nodes.length).toEqual(VALUES.length - 1);
      expect(tree.treeHeight).toEqual(expectedHeight);
    });
  });

  describe('toArray()', () => {
    let result;

    beforeAll(() => {
      tree = new BinaryTree();
      VALUES.forEach(v => tree.insert(v));
      result = tree.toArray().map(n => n.value);
    });

    it('should return an Array', () => {
      expect(Array.isArray(result)).toBe(true);
    });

    it('should contain each original value', () => {
      expect(result.length === VALUES.length);
      expect(VALUES.every(val => result.includes(val))).toBe(true);
    });
  });

  describe('visitNodesInBF()', () => {
    let result = [];

    beforeAll(() => {
      tree = new BinaryTree();
      VALUES.forEach(v => tree.insert(v));
      tree.visitNodesBF(n => result.push(n.value));
    });

    it('order should match original values array', () => {
      for(let i = 0; i < VALUES.length; i++) {
        expect(result[i]).toEqual(VALUES[i]);
      }
    });
  });
});
