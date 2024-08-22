// do this every time
let id = 0;
unpauseSimulation();

async function run() {
    // something to do with generating a source with the tag "sources"
    let sources = []
    sources.push(new Source(0, 0, 800));
    u.sources = u.sources.concat(sources);
    rerender();

    // something to do with generating a bunch of vehicles with the tag "vehicles"
    let vehicles = []
    for (let i = 0; i < 36; i ++) {
        let vehicle = new Vehicle2b(new Gyro(u, 50 * Math.cos(6.28 * i / 36), 50 * Math.sin(6.28 * i / 36), 6.28 * i / 12 + 3.14), id)
        vehicles.push(vehicle);
        u.addVehicle(vehicle);
        id++;
    }

    // block for "infinite" behavior (stop when the frame rate is too low so the browser doesn't crash)
    while (frameRate() > 5) {
        console.log(frameRate());
        for (vehicle of vehicles) {
            vehicle.setCurrentColor("red");
        }
    
        await delay(1000);
        for (vehicle of vehicles) {
            vehicle.setCurrentColor("orange");
        }
        
        await delay(1000);
        for (vehicle of vehicles) {
            vehicle.setCurrentColor("yellow");
        }
    
        await delay(1000);
        for (vehicle of vehicles) {
            vehicle.setCurrentColor("green");
        }
        await delay(1000);
        for (vehicle of vehicles) {
            vehicle.setCurrentColor("aqua");
        }
    
        await delay(1000);
        for (vehicle of vehicles) {
            vehicle.setCurrentColor("purple");
        }
        await delay(1000);
        for (vehicle of vehicles) {
            vehicle.setCurrentColor("pink");
        }
        await delay(1000);
    }
    alert("The simulation has been paused to avoid a browser crash. Proceed at your own risk.");
    pauseSimulation();
}
run();