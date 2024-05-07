let id = 0;
unpauseSimulation();
let source;
let vehicle;

async function run() {
    let sources = []
    source = new Source(0, -70, 800);
    sources.push(source);
    u.addSource(source);
    rerender();

    let sides = []
    vehicle = new Vehicle1(new Gyro(u, 0, 50, -2*Math.PI/3), id);
    sides.push(vehicle);
    u.addVehicle(vehicle);
    id++;
    vehicle = new Vehicle1(new Gyro(u, 0, 50, -Math.PI/3), id);
    sides.push(vehicle);
    u.addVehicle(vehicle);
    id++;

    for (let vehicle of sides) {
        vehicle.setCurrentColor("#840B84");
    }

    await delay(4000);

    for (let vehicle of sides) {
        vehicle.setCurrentColor("white");
    }

    await delay(1200);

    let round = []
    vehicle = new Vehicle2b(new Gyro(u, -28.9, -0.04, -3*Math.PI/4), id);
    round.push(vehicle);
    u.addVehicle(vehicle);
    id++;

    vehicle = new Vehicle2b(new Gyro(u, 28.9, -0.04, -Math.PI/4), id);
    round.push(vehicle);
    u.addVehicle(vehicle);
    id++;

    for (let vehicle of round) {
        vehicle.setCurrentColor("#A6A6A6");
    }

    await delay(300);

    let top = [];
    vehicle = new Vehicle2a(new Gyro(u, 0, -10, -7*Math.PI/12), id);
    top.push(vehicle);
    u.addVehicle(vehicle);
    id++;

    vehicle = new Vehicle2a(new Gyro(u, 0, -10, -5*Math.PI/12), id);
    top.push(vehicle);
    u.addVehicle(vehicle);

    await delay(1500);

    u.killVehicles(round);
    u.killVehicles(top);
    u.killVehicles(sides)
    u.killSources(sources);
}
run();