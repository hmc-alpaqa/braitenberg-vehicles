// do this every time
let id = 0;
unpauseSimulation();
let vehicle;
let source;

async function run() {
    // something to do with generating a source with the tag "sources"
    let sources = []
    source = new Source(0, 0, 800);
    sources.push(source);
    u.addSource(source);
    rerender();

    // something to do with generating a bunch of vehicles with the tag "vehicles"
    let vehicles = []
    for (let i = 0; i < 12; i ++) {
        vehicle = new Vehicle2b(new Gyro(u, 50 * Math.cos(6.28 * i / 12), 50 * Math.sin(6.28 * i / 12), 6.28 * i / 12 + 3.14), id)
        vehicles.push(vehicle);
        id++;
        u.addVehicle(vehicle);
    }

    for (let vehicle of vehicles) {
        vehicle.setCurrentColor("red");
    }

    // wait 1s before the next thing
    // this will be annoying because i think i have to somehow parse a block between two waits
    // though, maybe i could have two general blocks, a "do" block and a "wait" block
    // e.g.
    // do {
        // new sources, etc.
    // }
    // wait 1000
    // do {
        // new sources, etc.
    // }
    await delay(2000);
    for (let vehicle of vehicles) {
        vehicle.setCurrentColor("orange");
    }
    await delay(2000);
    for (let vehicle of vehicles) {
        vehicle.setCurrentColor("yellow");
    }
    let vehicles2 = []
    for (let i = 0; i < 12; i++) {
        vehicle = new Vehicle3b(new Gyro(u, 50 * Math.cos(6.28 * i / 12), 50 * Math.sin(6.28 * i / 12), 6.28 * i / 12 + 3.14), id)
        vehicles2.push(vehicle);
        id++;
        u.addVehicle(vehicle);
    }
    u.addVehicles(vehicles2);
    await delay(2000);
    for (let vehicle of vehicles) {
        vehicle.setCurrentColor("green");
    }
    await delay(2000);
    for (let vehicle of vehicles) {
        vehicle.setCurrentColor("aqua");
    }

    let vehicles3 = []
    for (let i = 0; i < 4; i++) {
        vehicle = new Vehicle2a(new Gyro(u, 100 * Math.cos(6.28 * i / 4), 100 * Math.sin(6.28 * i / 4), 6.28 * i / 4 + 3.14), id)
        vehicles3.push(vehicle);
        id++;
        u.addVehicle(vehicle);
    }
    u.addVehicles(vehicles3);

    for (let vehicle of vehicles3) {
        vehicle.setCurrentColor("white");
    }

    await delay(2000);
    for (let vehicle of vehicles) {
        vehicle.setCurrentColor("purple");
    }
    await delay(2000);
    for (let vehicle of vehicles) {
        vehicle.setCurrentColor("pink");
    }
    // kill vehicles with tag "vehicles2"
    u.killVehicles(vehicles2);
}
run();