// Given a sorted array of numbers starting at one
// find the missing number

//  0  1  2  3  4  5
// [1, 2, 4, 5, 6, 7];
//  l     m        h

const offset = 1;

const A = (nums, low, high) => {
  if(nums.length === 0) { return null; }

  low = low != null ? low : 0;
  high = high != null ? high : nums.length - 1;

  if(low === high && nums[low] === low + offset) {
    // no missing value
    return null;
  }

  let mid = Math.floor((low + high) / 2);

  if(nums[mid] > mid + offset) {
    // check if mid also point to first value, or
    // if the previous value is correct
    let prevIndex = mid - 1;

    if(mid === low || nums[prevIndex] === prevIndex + offset) {
      return mid + offset;
    }

    // recursive search to left
    return A(nums, low, mid - 1);
  } else {
    // recursive search to right
    return A(nums, mid + 1, high);
  }
};

module.exports = {};


let tests = [
  [1,2,3,4,5,6,7,9,10,11,12], // missing 8
  [2,3,4,5,6,7,8,9,10,11,12], // missing 1
  [1,3,4,5,6,7,8,9,10,11,12], // missing 2
  [1,2,3,4,5,6,7,8,9,10,12], // missing 11
  [1,2,3,4,5,6,7,8,9,10,11,12],
  [],
  [1],
  [2], // missing 1
];

tests.forEach(test => {
  console.log(`Given [${test.join(',')}] -> ${A(test)}`);
});
