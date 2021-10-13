////////// ADD VEHICLE BUTTON //////////
document.querySelector("#add-vehicle-button").addEventListener("click", () => {
    addingSource = false;
    addingVehicle = document.querySelector("#vehicle-select").value;
});

////////// ADD SOURCE BUTTON //////////
document.querySelector("#add-source-button").addEventListener("click", () => {
    addingSource = true;
    sourceIntensity = document.querySelector("#source-intensity-input").value;
})

////////// START/STOP BUTTON //////////
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
});

////////// RESET BUTTON //////////
document.querySelector("#reset-button").addEventListener("click", () => {
    if (!simulationPaused) {
        startStopButton.innerText = "Start";
        startStopButton.style.backgroundColor = "#EAAA00";
        startStopButton.style.color = "black";
    }
    resetUniverse();
});

////////// FRICTION SLIDER //////////
function updateFriction(value) {
    frictionMagnitude = parseInt(value);
    document.querySelector("#friction-label").innerHTML = `μ = ${frictionMagnitude}`;
}