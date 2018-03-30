// Review fibonacci using dynamic programming (FAST method)
// fib(0) = 0
// fib(1) = 1
// fib(n) = fib(n - 1) + fib(n - 2)

const A = (n) => {
  if(n < 0) throw 'expects argument to be a positive number';
  if(n < 2) return n;

  return A(n - 1) + A(n - 2);
}
// Time: O(2^n)
// Space: O(n)

const B = (n) => {
  if(n < 0) throw 'expects argument to be a positive number';
  if(n < 2) return n;

  let cache = [0, 1];

  return fib(n);

  function fib(n) {
    cache[n] = cache[n] != null
    ? cache[n]
    : fib(n - 1) + fib(n - 2);

    return cache[n];
  }
}
// Time: O(n)
// Space: O(n)

const C = (n) => {
  if(n < 0) throw 'expects argument to be a positive number';
  if(n < 2) return n;

  let cache = [0, 1];

  for(let i = 2; i < n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }

  return cache[n - 1] + cache[n - 2];
}
// Time: O(n)
// Space: O(n)

const D = (n) => {
  if(n < 0) throw 'expects argument to be a positive number';
  if(n < 2) return n;

  let nMinusOne = 1;
  let nMinusTwo = 0;

  for(let i = 2; i < n; i++) {
    let n = nMinusOne + nMinusTwo;

    nMinusTwo = nMinusOne;
    nMinusOne = n;
  }

  return nMinusOne + nMinusTwo;
}
// Time: O(n)
// Space: O(1)

module.exports = {
  solutions: [
    A,
    B,
    C,
    D,
  ],
};
