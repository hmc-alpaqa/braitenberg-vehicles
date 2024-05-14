class Universe {
    // creates a universe
    constructor() {
        this.sources = [];
        this.vehicles = [];
        this.stimuli = [];
        this.paths = new Map();
        this.speeds = new Map();
        this.colors = new Map();
        for (let i = 0; i < MAP_RESOLUTION; i++) {
            let row = []
            for (let j = 0; j < Math.round(MAP_RESOLUTION / ASPECT_RATIO); j++) {
                row.push(0);
            }
            this.stimuli.push(row);
        }
    }

    reset() {
        this.sources = [];
        this.vehicles = [];
        this.stimuli = [];
        this.paths.clear();
        this.speeds.clear();
        this.colors.clear();
        for (let i = 0; i < MAP_RESOLUTION; i++) {
            let row = []
            for (let j = 0; j < MAP_RESOLUTION; j++) {
                row.push(0);
            }
            u.stimuli.push(row);
        }
    }

    draw() {
        let pixelSize = MAP_RESOLUTION / (MAP_LENGTH * MAP_HEIGHT);
        // draw a square for each cell in stimuli
        for (i = 0; i < this.stimuli; i++) {
            for (j = 0; j < this.stimuli[i]; j++) {
                square(i * pixelSize, j * pixelSize, pixelSize);
            }
        }
    }

    addSource(source) {
        this.sources.push(source);
        rerender();
    }

    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
    }

    addVehicles(vehicles) {
        this.vehicles = this.vehicles.concat(vehicles);
    }

    killVehicles(vehicles) {
        this.vehicles = this.vehicles.filter(e => !vehicles.includes(e)); 
    }

    killSources(sources) {
        this.sources = this.sources.filter(e => !sources.includes(e));
        rerender();
    }

    getNearestVehicle(x, y) {
        if (this.vehicles.length > 0) {
            let mousePos = new Vector(x, y);
            let smallestDist = (this.vehicles[0].r.subtract(mousePos)).getMagnitude() ;
            let closestVehicle = this.vehicles[0]
            for (let vehicle of this.vehicles) {
                dist = (vehicle.r.subtract(mousePos)).getMagnitude();
                if (dist < smallestDist) {
                    smallestDist = dist
                    closestVehicle = vehicle;
                }
            }
            return closestVehicle; 
        }
        return null;
    }

    overVehicle(mouseX, mouseY, vehicle) {
        return (mouseX <= vehicle.x + VEHICLE_SIZE / 2) && (mouseX >= vehicle.x - VEHICLE_SIZE / 2)
        && (mouseY <= vehicle.y + VEHICLE_SIZE / 2) && (mouseY >= vehicle.y - VEHICLE_SIZE / 2);
    }

    removeVehicle(mouseX, mouseY, vehicle) {
        if (this.overVehicle(mouseX, mouseY, vehicle)) {
            let index = this.vehicles.indexOf(vehicle);
            if (index > -1) {
                this.vehicles.splice(index, 1);
            }
            updateVehicleCensus();
            rerender();
        }
    }

    getNearestSource(x, y) {
        if (this.sources.length > 0) {
            let mousePos = new Vector(x, y);
            let smallestDist = (this.sources[0].r.subtract(mousePos)).getMagnitude() ;
            let closestSource = this.sources[0]
            for (let source of this.sources) {
                dist = (source.r.subtract(mousePos)).getMagnitude()
                if (dist < smallestDist) {
                    smallestDist = dist
                    closestSource = source;
                }
            }
            return closestSource; 
        } 
        return null;
    }

    overSource(mouseX, mouseY, source) {
        return (mouseX <= source.x + SOURCE_SIZE / 2) && (mouseX >= source.x - SOURCE_SIZE / 2)
        && (mouseY <= source.y + SOURCE_SIZE / 2) && (mouseY >= source.y - SOURCE_SIZE / 2);
    }

    removeSource(mouseX, mouseY, source) {
        if (this.overSource(mouseX, mouseY, source)) {
            let index = this.sources.indexOf(source);
            if (index > -1) {
                this.sources.splice(index, 1);
            }
            rerender();
        }
    }

    getStimulus(x, y) {
        let sum = 0;
        for (let source of this.sources) {
            sum += source.getIntensity(x, y);
        }
        return sum;
    }


}