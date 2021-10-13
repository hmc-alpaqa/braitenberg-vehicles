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

    addSource(source) {
        this.sources.push(source);
    }

    getStimulus(x, y) {
        let sum = 0;
        for (let source of this.sources) {
            sum += source.getIntensity(x, y);
        }
        return sum;
    }


}