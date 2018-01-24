const { solutions } = require('./isPrime');

// sieve of eratosthanese?
function allPrimes(num) {
  let primes = [];
  let skipMap = {};

  for(let n = 2, x; n <= num; n++, x = n + n) {
    if(skipMap[n]) {
      continue;
    }

    primes.push(n);

    // we can safely skip all nultiples of n < num
    while(x <= num) {
      skipMap[x] = true;
      x += n;
    }
  }

  return primes;
}

module.exports = {
  constants: {},
  solutions: [
    allPrimes,
  ],
};
