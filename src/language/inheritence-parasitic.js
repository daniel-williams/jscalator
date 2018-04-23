// "Class" `Vehicle`
function Vehicle() {
  return {
    engines: 1,
    ignition: function() {
      console.log( "Turning on my engine." );
    },
    drive: function() {
      this.ignition();
      console.log( "Steering and moving forward!" );
    },
  };
}

// "Parasitic Class" 'Car'
function Car() {
  let car = Vehicle();
  let vehicleDrive = car.drive; // save priveleged reference

  car.wheels = 4;
  // override
  car.drive = function() {
    vehicleDrive.call(this);
    console.log(`Rolling on all ${this.wheels} wheels.`);
  }

  return car;
}

// tests (note: new keyword is not used/needed)
let car = Car();

car.drive();
