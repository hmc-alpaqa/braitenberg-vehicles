class Sensor extends Component {
    constructor(gyro, offset) {
        super(gyro, offset);
        this.theta = 0; // orientation of sensor
    }

    getOutput() { 
        let y = Math.round(this.getR().y);
        let x = Math.round(this.getR().x);
        return 100 * this.gyro.universe.getStimulus(x, y);
    }

}