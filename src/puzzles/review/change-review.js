const coins = [1, 5, 10, 25];

const makeChange = (changeAmount, coins) => {
  let cache = [[]];
  let sortedCoins = coins.sort((a,b) => b - a);

  for(let i = 1; i <= changeAmount; i++) {
    for(let c = 0; c < sortedCoins.length; c++) {
      let coin = sortedCoins[c];

      if(i - coin >= 0) {
        // lesser amounts have already been solved, so
        // this coin + previously change
        cache[i] = [coin, ...cache[i - coin]];
        break;
      }
    }
  }

  return cache[changeAmount];
};

const tests = [
  [1, coins],
  [44, coins],
  [92, coins],
]

tests.forEach(test => {
  console.log(`Given amount of ${test[0]} -> [${makeChange(...test).join(',')}]`)
});
