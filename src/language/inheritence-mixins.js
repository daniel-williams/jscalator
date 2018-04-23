// using mixins
const mixin = (source, target) => {
  Object.keys(source).forEach(key => {
    if(!(key in target)) {
      target[key] = source[key];
    }
  });

  return target;
};

// tests
const Vehicle = {
  engines: 1,
  ignition: function() {
		console.log( "Turning on my engine." );
	},
	drive: function() {
		this.ignition();
		console.log( "Steering and moving forward!" );
	},
};


let Car = mixin(Vehicle, {
  wheels: 4,

	drive: function() {
		Vehicle.drive.call(this);
		console.log( "Rolling on all " + this.wheels + " wheels!" );
	}
});

Car.drive();