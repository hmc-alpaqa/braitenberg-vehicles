function setup() {
    createCanvas(MAP_SIZE, MAP_SIZE);
    frameRate(FPS);
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
    for (let i = 0; i < MAP_RESOLUTION; i++) {
        for (let j = 0; j < MAP_RESOLUTION; j++) {
            u.stimuli[i][j] = u.getStimulus(j, i);
        }
    }
}

function renderTerrain() {
    for (y = 0; y < u.stimuli.length; y++) {
        for (x = 0; x < u.stimuli[y].length; x++) {
            pg.square(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE);
            pg.fill(255 + 256 * u.stimuli[y][x], 255 - 256 * abs(u.stimuli[y][x]), 190 - 256 * u.stimuli[y][x])

        }
    }
}

function resetUniverse() {
    u.vehicles = [];
    renderers = [];
    simulationPaused = true;
    addingSource = false;
}