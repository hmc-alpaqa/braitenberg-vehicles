document.querySelector("#add-vehicle-button").addEventListener("click", () => {
    addingVehicle = document.getElementById("vehicle-select").value;
})

let simulationPaused = true;
let startStopButton = document.querySelector("#start-stop-button");
startStopButton.addEventListener("click", () => {
    if (simulationPaused) {
        startStopButton.innerText = "Stop";
        startStopButton.style.color = "#FFFFFF";
        startStopButton.style.backgroundColor = "#000000";
    } else {
        startStopButton.innerText = "Start";
        startStopButton.style.backgroundColor = "#EAAA00";
        startStopButton.style.color = "black";
    }
    simulationPaused = !simulationPaused;
})

function updateFriction(value) {
    frictionMagnitude = parseInt(value);
    document.getElementById("friction-label").innerHTML = `μ = ${frictionMagnitude}`;
}