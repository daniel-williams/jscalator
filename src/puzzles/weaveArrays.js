// Given a set of unique numbers split into two array, return a list of
// arrays container every possible "weave" of the two array, such that the
// the order of numbers is consistent with the original arrays.

// Input
// [1,2],[3,4]

// Output
// [
//   [1,2,3,4],
//   [1,3,2,4],
//   [1,3,4,2],
//   [3,1,2,4],
//   [3,1,4,2],
//   [3,4,1,2],
// ]

const A = (first, second) => {
  let result = [];

  helper(first, second);

  return result;

  function helper(first, second, prefix = []) {
    if(!first.length || !second.length) {
      result.push(prefix.concat(first, second));
      return;
    }

    helper(first.slice(1), second, prefix.concat(first[0]), result);
    helper(first, second.slice(1), prefix.concat(second[0]), result);
  }
};

let result = A([1,2,3],[4,5,6]);

result.forEach(x => {
  console.log(` -> ${x.join(',')}`);
});
