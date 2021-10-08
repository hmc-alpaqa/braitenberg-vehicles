class Sensor extends Component {
    constructor(gyro, offset) {
        super(gyro, offset);
        // sensor averages intensity of stimuli across field of view
        this.width = 4;
        this.length = 4;

        this.theta = 0; // orientation of sensor
    }

    getValue() {
        // for (let r = 0; r < this.width; r++) {
        //     for (let c = 0; c < this.length; c++) {
        //         u[i][j] = 0;
        //     }
        // }    
        let y = Math.round(this.getR().y);
        let x = Math.round(this.getR().x);
        let grid = this.gyro.universe.stimuli;
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
            return this.gyro.universe.stimuli[y][x];
        } else {
            // if the location is outside the grid, return 0    
            return 0;
        }
    }

}