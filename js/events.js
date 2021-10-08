document.querySelector("#add-vehicle-button").addEventListener("click", () => {
    addingVehicle = document.getElementById("vehicle-select").value;
})

let simulationPaused = true;
let startStopButton = document.querySelector("#start-stop-button");
startStopButton.addEventListener("click", () => {
    startStopButton.innerText = simulationPaused ? "Stop" : "Start";
    simulationPaused = !simulationPaused;
})

function updateFriction(value) {
    frictionMagnitude = parseInt(value);
    document.getElementById("friction-label").innerHTML = `μ = ${frictionMagnitude}`;
}