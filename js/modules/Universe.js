class Universe {
    // creates a universe
    constructor() {
        this.sources = [];
        this.vehicles = [];
        this.stimuli = [];
        for (let i = 0; i < MAP_RESOLUTION; i++) {
            let row = []
            for (let j = 0; j < MAP_RESOLUTION; j++) {
                row.push(0);
            }
            this.stimuli.push(row);
        }
    }

    draw() {
        let pixelSize = MAP_RESOLUTION / MAP_SIZE;
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

    removeVehicle(vehicle) {
        let index = this.vehicles.indexOf(vehicle);
        if (index > -1) {
            this.vehicles.splice(index, 1);
        }
    }


    addSource(source) {
        this.sources.push(source);
    }

    getSource(x, y) {
        let closestSource = null;
        for (let source of u.sources) {
            // temp solution, should consider intensity to locate source?
            // check if source is clicked on
            if (source.r.x - 10 < x && x < source.r.x + 10) {
                if (source.r.y - 10 < y && y < source.r.y + 10) {
                    // check if source is closer than one already found
                    if (closestSource) {
                        dist1 = sqrt(pow(closestSource.r.x - x, 2) + pow(closestSource.r.y - y, 2));
                        dist2 = sqrt(pow(source.r.x - x, 2) + pow(source.r.y - y, 2));
                        if (dist1 > dist2) {
                            closestSource = source;
                        }
                    } else {
                        closestSource = source;
                    }
                }
            }
        }
        return closestSource;
    }

    removeSource(source) {
        let index = this.sources.indexOf(source);
        if (index > -1) {
            this.sources.splice(index, 1);
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