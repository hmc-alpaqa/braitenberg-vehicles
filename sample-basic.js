// do this every time
let id = 0;
unpauseSimulation();
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    // something to do with generating a source with the tag "sources"
    let sources = []
    sources.push(new Source(0, 0, 800));
    u.sources = u.sources.concat(sources);
    rerender();

    // something to do with generating a bunch of vehicles with the tag "vehicles"
    let vehicles = []
    for (let i = 0; i < 12; i ++) {
        vehicles.push(new Vehicle2b(new Gyro(u, 50 * Math.cos(6.28 * i / 12), 50 * Math.sin(6.28 * i / 12), 6.28 * i / 12 + 3.14), id));
        id++;
    }
    u.vehicles = u.vehicles.concat(vehicles);
    for (vehicle of vehicles) {
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
    for (vehicle of vehicles) {
        vehicle.setCurrentColor("orange");
    }
    await delay(2000);
    for (vehicle of vehicles) {
        vehicle.setCurrentColor("yellow");
    }
    let vehicles2 = []
    for (let i = 0; i < 12; i++) {
        vehicles2.push(new Vehicle3b(new Gyro(u, 50 * Math.cos(6.28 * i / 12), 50 * Math.sin(6.28 * i / 12), 6.28 * i / 12 + 3.14), id));
        id++;
    }
    u.vehicles = u.vehicles.concat(vehicles2);
    await delay(2000);
    for (vehicle of vehicles) {
        vehicle.setCurrentColor("green");
    }
    await delay(2000);
    for (vehicle of vehicles) {
        vehicle.setCurrentColor("aqua");
    }

    let vehicles3 = []
    for (let i = 0; i < 4; i++) {
        vehicles3.push(new Vehicle2a(new Gyro(u, 100 * Math.cos(6.28 * i / 4), 100 * Math.sin(6.28 * i / 4), 6.28 * i / 4 + 3.14), id));
        id++;
    }
    u.vehicles = u.vehicles.concat(vehicles3);

    for (vehicle of vehicles3) {
        vehicle.setCurrentColor("white");
    }

    await delay(2000);
    for (vehicle of vehicles) {
        vehicle.setCurrentColor("purple");
    }
    await delay(2000);
    for (vehicle of vehicles) {
        vehicle.setCurrentColor("pink");
    }
}
run();