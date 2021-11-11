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
    addingVehicle = Vehicles.NONE;
    addingSource = false;
    removingSource = false;
    sourceIntensity = 100;
    updateFriction(document.getElementById("friction-slider").value);

    pg = createGraphics(MAP_SIZE, MAP_SIZE);
    pg.background(220);
    pg.noStroke();

    θ = 0;
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
        if (vehicle.gyro.r.getMagnitude() > 2048) {
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

    if (addingVehicle) {
        switch (addingVehicle) {
            case Vehicles.VEHICLE1:
                vehicle = Vehicle1(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE2A:
                vehicle = Vehicle2a(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE2B:
                vehicle = Vehicle2b(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE2C:
                vehicle = Vehicle2c(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE3A:
                vehicle = Vehicle3a(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
        }
    }

    if (keyIsPressed && (keyCode === RIGHT_ARROW)) {
        θ += 0.05;
    } else if (keyIsPressed && (keyCode === LEFT_ARROW)) {
        θ -= 0.05;
    }
}

function mouseWheel(event) {
    θ += event.delta/100;
}

function mouseClicked() {
    let vehicle;
    if (mouseX > 0 && mouseY > 0 && mouseX < MAP_SIZE && mouseY < MAP_SIZE) {
        if (addingSource) {
            u.addSource(new Source(mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, sourceIntensity));
            generateTerrain();
            renderTerrain();
        } else if (removingSource) {
            let source = u.getSource(mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE);
            if (source) {
                u.removeSource(source);
                generateTerrain();
                renderTerrain();
            }
        } else {
            switch (addingVehicle) {
                case Vehicles.NONE:
                    return;
                case Vehicles.VEHICLE1:
                    vehicle = Vehicle1(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE2A:
                    vehicle = Vehicle2a(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE2B:
                    vehicle = Vehicle2b(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE2C:
                    vehicle = Vehicle2c(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE3A:
                    vehicle = Vehicle3a(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
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