// A magic index in an array A [1...n-1] is defined to be an
// index such that A[ i] = i. Given a sorted array of distinct
// integers, write a method to find a magic index, if one exists,
// in array A.

// Follow Up
// What if the values are not distinct?

// Ideas
// A) Brute force
// B) Binary search

const A = (nums) => {
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] === i) { return i; }
  }

  return -1;
}
// Time: O(n)

const B = (nums, left, right) => {
  left = left != null ? left : 0;
  right = right != null ? right : nums.length - 1;

  if(right < left) { return -1; }

  let mid = Math.floor((left + right) / 2);

  if(nums[mid] === mid) { return mid; }

  return nums[mid] > mid
    ? B(nums, left, mid - 1)
    : B(nums, mid + 1, right);
};

const solutions = [A, B];
const tests = [
  [-20, -10, -1, 3, 10, 16, 23, 76],
  [0, 4, 7, 23, 92, 120, 340, 584, 900],
  [-10, -5, -1, 0, 4],
  [-10, -8, -5, 20, 43, 82, 122],
];

solutions.forEach((s, i) => {
  console.log('');
  console.log(`Solution #${i + 1}`);
  tests.forEach((test, j) => {
    console.log(`${j + 1}) Given [${test.join(',')}] -> ${s(test)}`);
  });
});
