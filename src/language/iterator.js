let o = {};

Object.defineProperty(o, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: () => {
    let count = 0;

    return {
      next: () => {
        count++;

        return {
          value: Math.floor(Math.random() * 100),
          done: count > 10,
        };
      },
    };
  },
});

// tests

console.log('');
console.log('implicit');

for(let x of o) {
  console.log(`-> ${x}`);
}

console.log('');
console.log('explicit');

let it = o[Symbol.iterator]();
let rnd = it.next();

while(!rnd.done) {
  console.log(`-> ${rnd.value}`);
  rnd = it.next();
}

