// Instructions:
// You can edit a string in one of three ways
//   1) you can insert a char
//   2) you can delete a char
//   3) you can replace a char
// Given strings A & B, determine is B is one edit away from A

// Ideas
// A) Check each char in strings, if not equal we need to branch and perform
//    each edit type, afterwhich the strings should be equal.

// It is assumed that only one string was edited.
// Considering the three operations that can be performed, I don't believe it
// matters which string (A or B) was actually edited, that is, inserting a char
// to one is equivalent to having deleted that char from the other.

function A(a, b) {
  for(let i = 0; i < a.length; i++) {
    if(a[i] !== b[i]) {
      let aSub = a.slice(i);
      let bSub = b.slice(i);
      let bDeleted = a[i] + bSub; // put it back
      let bInserted = bSub.slice(1); // take it away
      let bEdited = a[i] + bSub.slice(1); // change it back

      return (aSub === bDeleted || aSub === bInserted || aSub === bEdited);
    }
  }

  return true;
}

module.exports = {
  s1: A,
};

const tests = [
  ['abcdef', 'abcdef'], // same
  ['abcdef', 'abzdef'], // edit
  ['abcdef', 'abcef'], // delete
  ['abcdef', 'abczdef'], // insert
  ['abcdef', 'abzcdf'], // insert and delete
  ['abcdef', 'abzzef'], // edit and edit
  ['abcdef', 'azbcdezf'], // insert and insert
  ['abcdef', 'abcd'], // delete and delete
];

tests.forEach(x => console.log(`given ${x} -> ${A(...x)}`));
