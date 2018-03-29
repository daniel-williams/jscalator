// Describe how you could use an array to implement three stacks

// Ideas
// A) Divide an arrays capacity into 3rds, and keep a pointer to top value
//    for each of the stacks
//    Pros: easy to implement
//    Cons: might be inefficient use of space


class NStacksA {
  constructor(numStacks, capacity) {
    this.stackCapacity = Math.floor(capacity / numStacks);
    this.storage = new Array(this.stackCapacity * numStacks);
    this.pointers = new Array(numStacks).fill(0);

    for(let i = 0; i < numStacks; i++) {
      this.pointers[i] = i * this.stackCapacity;
    }
  }

  size(stack) {
    return this.stackCapacity;
  }

  isEmpty(stack) {
    return this.pointers[stack] === stack * this.stackCapacity;
  }

  isFull(stack) {
    return this.pointers[stack] === stack * this.stackCapacity + this.stackCapacity;
  }

  push(stack, value) {
    if(!this.isFull(stack)) {
      this.storage[this.pointers[stack]] = value;
      this.pointers[stack]++;
    } else {
      throw `Stack #${stack} is full.`;
    }
  }

  pop(stack) {
    if(!this.isEmpty(stack)) {
      this.pointers[stack]--;

      let value = this.storage[this.pointers[stack]];

      delete this.storage[this.pointers[stack]];

      return value;
    }
  }

  peek(stack) {
    if(!this.isEmpty(stack)) {
      this.storage[this.pointers[stack]];
    }
  }

  print() {
    console.log(`values: [${this.storage.join(',')}]`);
  }
}

module.exports = {
  s1: NStacksA,
};


let stacks = new NStacksA(3, 100);

stacks.print();

for(let i = 0; i < 3; i++) {
  // last push should throw
  for(let j = 1; j < 35; j++) {
    try {
      stacks.push(i, j);
    } catch(e) {
      console.log(`Error pushing ${j} : ${e}`);
    }
  }
}

stacks.print();

for(let i = 0; i < 3; i++) {
  let result = [];
  // last pop should return undefined
  for(let j = 1; j < 35; j++) {
    result.push('' + stacks.pop(i));
  }
  console.log(`stack #${i} pop = [${result.join(',')}]`);
}

stacks.print();