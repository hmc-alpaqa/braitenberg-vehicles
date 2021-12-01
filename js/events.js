////////// DOM ELEMENTS //////////
let vehicleSelect = document.querySelector("#vehicle-select");
let addVehicleButton = document.querySelector("#add-vehicle-button");
let addSourceButton = document.querySelector("#add-source-button");
let removeSourceButton = document.querySelector("#remove-source-button");
let startStopButton = document.querySelector("#start-stop-button");
let resetButton = document.querySelector("#reset-button");

////////// ADD VEHICLE INPUT //////////
vehicleSelect.addEventListener("change", () => {
    if (addingVehicle != Vehicles.NONE) {
        addingVehicle = vehicleSelect.value;
    }
})

////////// ADD VEHICLE BUTTON //////////
addVehicleButton.addEventListener("click", () => {
    if (addingVehicle != Vehicles.NONE) {
        addingVehicle = Vehicles.NONE;
        addVehicleButton.classList.remove("clicked");
    } else {
        addingSource = false;
        removingSource = false;
        addingVehicle = vehicleSelect.value;
        addVehicleButton.classList.add("clicked");
        addSourceButton.classList.remove("clicked");
        removeSourceButton.classList.remove("clicked");
    }
});

////////// ADD SOURCE BUTTON //////////
addSourceButton.addEventListener("click", () => {
    sourceIntensity = document.querySelector("#source-intensity-input").value;
    if (addingSource) {
        addingSource = false;
        addSourceButton.classList.remove("clicked");
    } else if (sourceIntensity > 0 && sourceIntensity <= 1000) {
        addingVehicle = Vehicles.NONE;
        addingSource = true;
        removingSource = false;
        addVehicleButton.classList.remove("clicked");
        addSourceButton.classList.add("clicked");
        removeSourceButton.classList.remove("clicked");
    } else {
        alert("Please enter an intensity above 0 and under 1000.");
    }
    
})

////////// REMOVE SOURCE BUTTON //////////
removeSourceButton.addEventListener("click", () => {
    if (removingSource) {
        removingSource = false;
        removeSourceButton.classList.remove("clicked");
    } else {
        addingVehicle = Vehicles.NONE;
        addingSource = false;
        removingSource = true;
        addVehicleButton.classList.remove("clicked");
        addSourceButton.classList.remove("clicked");
        removeSourceButton.classList.add("clicked");
    }
})

////////// START/STOP BUTTON //////////
let simulationPaused = true;
startStopButton.addEventListener("click", () => {
    if (simulationPaused) {
        startStopButton.innerText = "Stop";
        startStopButton.classList.add("clicked");
    } else {
        startStopButton.innerText = "Start"
        startStopButton.classList.remove("clicked");
    }
    simulationPaused = !simulationPaused;
});

////////// RESET BUTTON //////////
resetButton.addEventListener("click", () => {
    if (!simulationPaused) {
        startStopButton.innerText = "Start";
        addVehicleButton.classList.remove("clicked");
        addSourceButton.classList.remove("clicked");
        removeSourceButton.classList.remove("clicked");
        startStopButton.classList.remove("clicked");
    }
    resetUniverse();
});