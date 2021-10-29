class Sensor extends Component {
    constructor(gyro, offset) {
        super(gyro, offset);
        this.theta = 0; // orientation of sensor
    }

    getOutput() {
        // for (let r = 0; r < this.width; r++) {
        //     for (let c = 0; c < this.length; c++) {
        //         u[i][j] = 0;
        //     }
        // }    
        let y = Math.round(this.getR().y);
        let x = Math.round(this.getR().x);
        let grid = this.gyro.universe.stimuli;
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
            return 1000 * this.gyro.universe.getStimulus(y, x);
        } else {
            // if the location is outside the grid, return 0    
            return 0;
        }
    }


    memoizedCopy(copiedComponents = {}) {
        if (this in copiedComponents) {
            return copiedComponents[this];
        } else {
            if (!this.gyro in copiedComponents) {
                copiedComponents.set(this.gyro, this.gyro.copy());
            }
            let newCopy = new Sensor(copiedComponents.get(this.gyro), this.offset.copy());
            copiedComponents.set(this, newCopy);
            return newCopy;
        }
    }
}