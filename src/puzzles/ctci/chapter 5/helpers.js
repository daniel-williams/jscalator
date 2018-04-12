function bin(v) {
  return padLeft((v >>> 0).toString(2));
}

function padLeft(v, n = 32, c = '0') {
  if(v.length >= n) { return v; }

  return new Array(n - v.length).fill(c).join('') + v;
}

function createMask(start, span) {
  let mask = (~0 >>> 0);
  let end = span ? start - span : 0;

  return mask ^ (((1 << start - end) - 1) << end);
}

function getBit(n, i) {
  return (n & (1 << i)) === 0 ? 0 : 1;
}

module.exports = {
  bin,
  createMask,
  getBit,
  padLeft,
};
