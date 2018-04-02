// Given an input of 6
// Write an algorithm to produce the following output

// 1
// 1   1
// 1   2   1
// 1   3   3   1
// 1   4   6   4   1
// 1   5   10  10  5   1




const fn = (n) => {
  let rows = new Array(n - 1).fill(0);

  for (let i = 0; i < n; i++) {
    rows[i] = new Array(n).fill(0);
    rows[i][0] = 1;
  }

  for (let i = 1; i < rows.length; i++) {
    for (let j = 1; j < rows[0].length; j++) {
      let cellAbove = rows[i - 1][j];
      let cellAboveLeft = rows[i - 1][j - 1] || 0; // assumes negative index returns undefined

      rows[i][j] = cellAbove + cellAboveLeft;
    }
  }

  rows.forEach(row => {
    console.log(row.filter(n => !!n).join(' '));
  });
}

fn(6);

