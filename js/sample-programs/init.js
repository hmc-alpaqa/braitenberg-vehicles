let id = 0;
let source;
let vehicle;

source = new Source(0, 0, 100);

let vehicle1 = new Vehicle1(new Gyro(u, 0, 25, -3 * Math.PI/4), 0);
let vehicle2 = new Vehicle1(new Gyro(u, 0, 25, -Math.PI/4), 0);

u.addVehicle(vehicle1);
u.addVehicle(vehicle2);
u.addSource(source);

console.log(vehicle1.sensors[0].getR());
console.log(vehicle2.sensors[0].getR());