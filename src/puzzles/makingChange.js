// Given an amount, write a function to calculate the minimum number of coins
// required to make that amount of change

const coins = [25, 10, 5, 1];

// Brute force - find every combination of coins that sum to amount
// to find minimum number of coins required
const A = (amount) => {
  // base case, no coins required to make amount
  if(amount === 0) { return 0; }

  let minCoinCount = Number.MAX_VALUE;

  coins.forEach(coin => {
    if(amount - coin >= 0) {
      let coinCount = A(amount - coin);

      // for each coin, we need to determine which results in
      // the minimum number of coins
      if(coinCount < minCoinCount) {
        minCoinCount = coinCount;
      }
    }
  });

  // other than base case (amount === 0), every recursive call uses a coin
  return minCoinCount + 1;
}
// Time: O(a^c), where a = amount and c = number of coins
// Space: O(c)

const B = (amount) => {
  let minCoinCountCache = [0, 1];

  return makeChange(amount);

  function makeChange(amount) {
    if(minCoinCountCache[amount] != null) {
      return minCoinCountCache[amount];
    }

    let minCoinCount = Number.MAX_VALUE;

    coins.forEach(coin => {
      if(amount - coin >= 0) {
        let coinCount = makeChange(amount - coin);

        if(coinCount < minCoinCount) {
          minCoinCount = coinCount;
        }
      }
    });

    minCoinCountCache[amount] = minCoinCount + 1;

    return minCoinCountCache[amount];
  }
}
// Time: O(a*c), where a = amount and c = number of coins
// Space: O(c)


module.exports = {};


const tests = [
  44,
  23,
  6,
];

tests.forEach(n => {
  console.log(`A) ${A(n)} coins required to make change for ${n}.`);
  console.log(`B) ${B(n)} coins required to make change for ${n}.`);
});
