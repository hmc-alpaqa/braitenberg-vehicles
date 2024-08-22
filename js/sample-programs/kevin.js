let id = 0;
unpauseSimulation();
let vehicle;
let source;

async function run() {
    let sources = []
    source = new Source(-50, 0, 100);
    sources.push(source);
    u.addSource(source);
    rerender();

    source = new Source(25, -25, 100);
    sources.push(source);
    u.addSource(source);
    rerender();

    source = new Source(75, -25, 100);
    sources.push(source);
    u.addSource(source);
    rerender();

    source = new Source(150, -25, 100);
    sources.push(source);
    u.addSource(source);
    rerender();

    let K = [];
    vehicle = new Vehicle1(new Gyro(u, -100, 25, -Math.PI/2), id);
    K.push(vehicle);
    id++;
    u.addVehicle(vehicle);

    vehicle = new Vehicle1(new Gyro(u, -100, 0, -Math.PI/4), id);
    K.push(vehicle);
    id++;
    u.addVehicle(vehicle);

    vehicle = new Vehicle1(new Gyro(u, -100, 0, Math.PI/4), id);
    K.push(vehicle);
    id++;
    u.addVehicle(vehicle);

    for (let vehicle of K) {
        vehicle.setCurrentColor("red");
    }

    let E = [];
    vehicle = new Vehicle1(new Gyro(u, -50, 25, -Math.PI/2), id);
    E.push(vehicle);
    id++;
    u.addVehicle(vehicle);

    
    vehicle = new Vehicle1(new Gyro(u, -50, -25, 0), id);
    E.push(vehicle);
    id++;
    u.addVehicle(vehicle);

    vehicle = new Vehicle1(new Gyro(u, -50, 0, 0), id);
    E.push(vehicle);
    id++;
    u.addVehicle(vehicle);

    vehicle = new Vehicle1(new Gyro(u, -50, 25, 0), id);
    E.push(vehicle);
    id++;
    u.addVehicle(vehicle);

    for (let vehicle of E) {
        vehicle.setCurrentColor("orange");
    }

    let V = [];
    vehicle = new Vehicle1(new Gyro(u, 25, 25, -2*Math.PI/3), id);
    V.push(vehicle);
    id++;
    u.addVehicle(vehicle);

    vehicle  = new Vehicle1(new Gyro(u, 25, 25, -Math.PI/3), id);
    V.push(vehicle);
    id++;
    u.addVehicle(vehicle);

    for (let vehicle of V) {
        vehicle.setCurrentColor("yellow");
    }

    let I = [];
    vehicle = new Vehicle1(new Gyro(u, 75, 25, -Math.PI/2), id);
    I.push(vehicle);
    id++;
    u.addVehicle(vehicle);

    for (let vehicle of I) {
        vehicle.setCurrentColor("green");
    }

    let N = [];
    vehicle = new Vehicle1(new Gyro(u, 125, 25, -Math.PI/2), id);
    N.push(vehicle);
    id++;
    u.addVehicles(vehicle);

    vehicle = new Vehicle1(new Gyro(u, 175, 25, -3*Math.PI/4), id);
    N.push(vehicle);
    id++;
    u.addVehicles(vehicle);

    vehicle = new Vehicle1(new Gyro(u, 175, 25, -Math.PI/2), id);
    N.push(vehicle);
    id++;
    u.addVehicles(vehicle);

    for (let vehicle of N) {
        vehicle.setCurrentColor("aqua");
    }

    await delay(2000);

    u.killVehicles(E);

    await delay(1000);

    u.killVehicles(I);

    await delay(500);

    u.killVehicles(V);

    await delay(2500);

    u.killVehicles(N);

    await delay(4000);

    u.killVehicles(K);
    u.killSources(sources);
}

run();