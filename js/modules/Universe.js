class Universe {
    // creates a universe
    constructor() {
        this.sources = [];
        this.vehicles = [];
        this.stimuli = [];
        for (let i = 0; i < MAP_RESOLUTION; i++) {
            let row = []
            for (let j = 0; j < Math.round(MAP_RESOLUTION / ASPECT_RATIO); j++) {
                row.push(0);
            }
            this.stimuli.push(row);
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

    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
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
            rerender();
        }
    }

    addSource(source) {
        this.sources.push(source);
        rerender();
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