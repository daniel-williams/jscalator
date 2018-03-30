const { Queue } = require('../../../structures');

// An animal shelter, which holds only dogs and cats, operates on a strictly "first in, first
// out" basis. People must adopt either the "oldest" (based on arrival time) of all animals
// at the shelter, or they can select whether they would prefer a dog or a cat (and will
// receive the oldest animal of that type). They cannot select which specific animal they
// would like. Create the data structures to maintain this system and implement operations
// such as enqueue, dequeueAny, dequeueDog, and dequeueCat.

class AnimalShelter {
  constructor() {
    this.catQueue = new Queue();
    this.dogQueue = new Queue();
    this.order = 0;
  }

  enqueue(type, name) {
    let animal = new Animal(this.order++, type, name);

    if(animal.type === AnimalType.cat) {
      this.catQueue.enqueue(animal);
    } else if(animal.type === AnimalType.dog) {
      this.dogQueue.enqueue(animal);
    }
  }

  dequeueAny() {
    let oldestCat = this.catQueue.peek();
    let oldestDog = this.dogQueue.peek();

    if(oldestCat == null && oldestDog == null) {
      return null;
    } else if(oldestCat == null) {
      return this.dogQueue.dequeue();
    } else if(oldestDog == null) {
      return this.catQueue.dequeue();
    }

    return oldestCat.order < oldestDog.order
      ? this.catQueue.dequeue()
      : this.dogQueue.dequeue();
  }

  dequeueCat() {
    return this.catQueue.dequeue() || null;
  }

  dequeueDog() {
    return this.dogQueue.dequeue() || null;
  }
}

const AnimalType = {
  cat: 'cat',
  dog: 'dog',
};

class Animal {
  constructor(order, type, name) {
    this.order = order;
    this.type = type;
    this.name = name;
  }
}

module.exports = {};


let shelter = new AnimalShelter();
let animals = [
  [AnimalType.cat, 'Felix'],
  [AnimalType.cat, 'Semore'],
  [AnimalType.dog, 'Jax'],
  [AnimalType.dog, 'Sparky'],
  [AnimalType.dog, 'Eddie'],
  [AnimalType.cat, 'Casper'],
  [AnimalType.dog, 'Jasper'],
];

animals.forEach(x => shelter.enqueue(...x));

console.log(`adopt dog: ${shelter.dequeueDog().name}`);
console.log(`adopt any: ${shelter.dequeueAny().name}`);
console.log(`adopt dog: ${shelter.dequeueDog().name}`);
console.log(`adopt cat: ${shelter.dequeueCat().name}`);
console.log(`adopt any: ${shelter.dequeueAny().name}`);
console.log(`adopt any: ${shelter.dequeueAny().name}`);
