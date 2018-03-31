// Given a list of items with values and weights, as well as a max
// weight, find the maximum value you can generate from items,
// where the sum of the weights is less than or equal to the max.

// Input
// knapsack(items, max weight)
// items = [{w:2, v:6}, {w:2, v:10}, {w:3, v:12}]
// max weight = 5

// Output
// 22

// Ideas
// A) brute force find all permutations where weight < max weight, return largest value


const A = (items, maxWeight) => {
  let result = [];

  pack(items, maxWeight, 0);

  return result.reduce((accum, value) => Math.max(value, accum), 0);

  function pack(items, maxWeight, value) {
    let itemAdded = false;

    if(!items.length || maxWeight === 0) {
      result.push(value);
      return;
    }

    for(let i = 0; i < items.length; i++) {
      if(items[i].w <= maxWeight) {
        itemAdded = true;
        pack([...items.slice(0, i), ...items.slice(i + 1)], maxWeight - items[i].w, value + items[i].v);
      }
    };

    if(!itemAdded) {
      // no remaining items will fit
      pack([], maxWeight, value);
    }
  }
};


module.exports = {};


const tests = [
  [
    [{w:2, v:6}, {w:2, v:10}, {w:3, v:12}],
    5
  ],
];

tests.forEach(test => {
  console.log(`Given items [${test[0].map(x=> `{w:${x.w},v:${x.v}}`).join(',')}] and max weight of ${test[1]} -> ${A(...test)}`);
});