
const solution1 = (a, x) => {
  function fn(a, x, low, high) {
    if(low === high) {
      return a[low] === x;
    }

    const mid = Math.floor((low + high) / 2);

    if(a[mid] === x) {
      return true;
    }

    // Note: remember, we must test if mid is equal to low or high
    if(a[mid] > x) {
      return a[mid] === low
        ? false
        : fn(a, x, low, mid - 1);
    }

    return a[mid] === high
      ? false
      : fn(a, x, mid + 1, high);
  }

  return a.length
    ? fn(a, x, 0, a.length - 1)
    : false;
}

module.exports = {
  constants: {
  },
  solutions: [
    solution1,
  ],
};
