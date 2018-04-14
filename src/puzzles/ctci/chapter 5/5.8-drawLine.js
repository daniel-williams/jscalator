const { StringBuilder } = require('../../../structures');

// A monochrome screen is stored as a single array of bytes, allowing eight
// consecutive pixels to be stored in one byte. The screen has width w,
// where w is divisible by 8 (that is, no byte will be split across rows).
// The height of the screen, of course, can be derived from the length of
// the array and the width. Implement a function that draws a horizontal
// line from (xl, y) to (x2, y). The method signature should look something
// like:

// drawLine(byte[] screen, int width, int xl, int x2, int y)

// Ideas
// A) Determine bytes per row base on width and screen length. Use y to
//    skip rows and x1 to skip bits in target row, then using the delta
//    between x1 and x2, turn on appropriate bits using masks

const A = (screen, width, x1, x2, y) => {
  let bitsPerByte = 8;
  let fullMask = 255; // 0xFF
  let bytesPerRow = width / bitsPerByte;
  let rowOffset = y * bytesPerRow; // zero based

  let firstByte = Math.floor(x1 / bitsPerByte);
  let lastByte = Math.floor(x2 / bitsPerByte);
  let totalByteCount = lastByte - firstByte + 1;

  let firstMask = firstByte === lastByte
    ? (~(fullMask >> (x2 - x1 + 1)) & fullMask) >> (x1 % bitsPerByte)
    : fullMask >> (x1 % bitsPerByte);
  let lastMask = ~(fullMask >> (x2 % bitsPerByte + 1)) & fullMask;

  // set first byte
  screen[rowOffset + firstByte] |= firstMask;
  // set last byte if needed
  if(lastByte > firstByte) {
    screen[rowOffset + lastByte] |= lastMask;
  }
  // set full bytes if needed
  if(totalByteCount > 2) {
    for(let i = firstByte + 1; i < lastByte; i++) {
      screen[rowOffset + i] |= fullMask;
    }
  }

  return screen;
};

const solutions = [
  A,
];
const tests = [
  [10, 40, 1, 6, 0],
  [10, 40, 1, 38, 1],
];

solutions.forEach((s, i) => {
  console.log('');
  console.log(`Solution #${i + 1}`);
  tests.forEach((test, j) => {
    let screen = buildScreenArray(test[1] / 8 * test[0]);
    let result = s(screen, ...test.slice(1));

    let builder = new StringBuilder();
    let width = test[1];

    console.log(`${j + 1}) Given [${test.join(',')}]`);
    result.forEach((byte, i) => {
      if(i > 0 && i % (width / 8) === 0) {
        builder.append('\r\n');
      }
      if(byte === 0) {
        builder.append('........');
      } else if (byte === 255) {
        builder.append('--------');
      } else {
        for(let i = 7; i >= 0; i--) {
          builder.append(byte & (1 << i) ? '-' : '.');
        }
      }
    });
    console.log(builder.toString());
  });
});

function buildScreenArray(n) {
  return new Array(n).fill(0);
}
