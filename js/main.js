function setup() {
    createCanvas(MAP_SIZE, MAP_SIZE);
    frameRate(FPS);
    ellipseMode(CENTER);
    rectMode(CENTER);
    angleMode(RADIANS);
    // gyro object contains x, y location and orientation
    // each sensor, controller, motor takes the gyro as a parameter to construct
    // Vehicle object contains gyro, sensors, controllers, motors
    u = new Universe();
    addingVehicle = Vehicles.VEHICLE1;
    addingSource = false;
    sourceIntensity = 100;
    updateFriction(document.getElementById("friction-slider").value);

    pg = createGraphics(MAP_SIZE, MAP_SIZE);
    pg.background(220);
    pg.noStroke();
}

function draw() {
    background(220);
    // draw a square for each cell in stimuli
    image(pg, 0, 0, MAP_SIZE, MAP_SIZE);
    if (u.vehicles.length > 0) {
        let mostRecentVehicle = u.vehicles[u.vehicles.length - 1]
        Renderer.renderText(mostRecentVehicle);
        Renderer.drawPath(mostRecentVehicle);
    }
    for (let vehicle of u.vehicles) {
        Renderer.renderVehicle(vehicle);
        if (vehicle.gyro.r.getMagnitude() > 10000) {
            u.removeVehicle(vehicle);
        }
    }

    for (let source of u.sources) {
        Renderer.renderSource(source);
    }

    if (!simulationPaused) {
        for (let vehicle of u.vehicles) {
            vehicle.step(1 / FPS);
        }
    }
}

function mouseClicked() {
    let vehicle;
    if (mouseX > 0 && mouseY > 0) {
        if (addingSource) {
            u.addSource(new Source(mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, sourceIntensity));
            generateTerrain();
            renderTerrain();
        } else {
            switch (addingVehicle) {
                case Vehicles.VEHICLE1:
                    vehicle = Vehicle1(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE);
                    break;
                case Vehicles.VEHICLE2A:
                    vehicle = Coward(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE);
                    break;
                case Vehicles.VEHICLE2B:
                    vehicle = Aggressive(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE);
                    break;
            }
            u.addVehicle(vehicle);
        }
    }
}

function generateTerrain() {
    for (let y = 0; y < MAP_RESOLUTION; y++) {
        for (let x = 0; x < MAP_RESOLUTION; x++) {
            u.stimuli[y][x] = u.getStimulus(x, y);
        }
    }
}

function renderTerrain() {
    for (y = 0; y < u.stimuli.length; y++) {
        for (x = 0; x < u.stimuli[y].length; x++) {
            pg.fill(255 + 256 * u.stimuli[y][x], 255 - 256 * abs(u.stimuli[y][x]), 190 - 256 * u.stimuli[y][x])
            pg.square(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE);
        }
    }
}

function resetUniverse() {
    u.vehicles = [];
    u.sources = [];
    renderers = [];
    simulationPaused = true;
    u.stimuli = []
    for (let i = 0; i < MAP_RESOLUTION; i++) {
        let row = []
        for (let j = 0; j < MAP_RESOLUTION; j++) {
            row.push(0);
        }
        u.stimuli.push(row);
    }
    pg.background(220);
    pg.noStroke();
}