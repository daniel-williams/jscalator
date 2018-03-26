// Given and image represented by an NxN matrix, where each pixel
// in the image is 4 bytes, write a function to rotate the image by 90 degrees.
// Can you do this in place?

// assumption: "in place" suggests that the image width and height are equal

// example
// [1,2,3,4]
// [1,2,3,4]
// [1,2,3,4]
// [1,2,3,4]

// rotated
// [1,1,1,1]
// [2,2,2,2]
// [3,3,3,3]
// [4,4,4,4]

function A(image) {
  let width = image[0].length;
  let height = image.length;

  for(let i = 0; i < width; i++) {
    for(let j = i; j < height; j++) {
      let temp = image[i][j];

      image[i][j] = image[j][i];
      image[j][i] = temp;
    }
  }

  return image;
}

module.exports = {
  s1: A,
};

const tests = [
  [
    [1,2,3,4],
    [1,2,3,4],
    [1,2,3,4],
    [1,2,3,4],
  ],
];

tests.forEach(x => {

  console.log('Given the matrix: ');
  x.forEach(row => console.log(`[${row.join(',')}]`));

  let result = A(x);
  console.log('');
  console.log('Rotated matrix: ');
  result.forEach(row => console.log(`[${row.join(',')}]`));

});
