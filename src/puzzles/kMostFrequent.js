// Given an array of integers, return the k most frequent

// Example
// Input: fn([3,9,3,2,1,6,3,4,2,8,9], 3)
// Output: [3,2,9];

const A = (nums, k) => {
  if(nums.length <= k) { return nums; }

  let result = [];
  let freq = {};
  let buckets = new Array(nums.length + 1).fill(null);

  nums.forEach(n => {
    freq[n] = freq[n]
      ? freq[n] + 1
      : 1;
  });

  Object.keys(freq).forEach(key => {
    let count = freq[key];

    if(!buckets[count]) {
      buckets[count] = [key];
    } else {
      buckets[count].push(key);
    }
  });

  for(let i = buckets.length - 1; i > 1 && result.length < k; i--) {
    if(buckets[i]) {
      result = result.concat(buckets[i]);
    }
  }

  return result.slice(0, k);
}
// Time: O(n) -> by use of bucket sort
// Space: O(n)

const tests = [
  [[3,9,3,2,1,6,3,4,2,8,9], 3],
  [[...'12345'], 3],
  [[...'4'], 3],
  [[...'55555'], 3],
];

tests.forEach(test => {
  console.log('');
  console.log(`Given [${test[0].join(',')}] and k=${test[1]} -> [${A(test[0], test[1]).join(',')}]`);
});
