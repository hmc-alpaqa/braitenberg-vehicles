let id = 0;
unpauseSimulation();
let vehicle;
async function run() {
    let sources = []
    sources.push(new Source(0, 200, 500));
    rerender();

    let sides = []
    let vehicle = new Vehicle1(new Gyro(u, 0, -50, -1), id);
    sides.push(vehicle);
    id++;
    let vehicle = new Vehicle1(new Gyro(u, 0, -50, -1), id);
    u.addVehicle()
    sides.push(n)
}
run();