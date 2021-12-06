////////// DOM ELEMENTS //////////
let doc = document.documentElement;
let fullscreenButton = document.querySelector("#fullscreen-button");
let fullscreenMessage = document.querySelector("#fullscreen-message");
let vehicleSelect = document.querySelector("#vehicle-select");
let addVehicleButton = document.querySelector("#add-vehicle-button");
let velocityFunctionSelect = document.querySelector("#velocity-function-select");
let startingVelocity = document.querySelector("#starting-velocity");
let velocitySlider = document.querySelector("#velocity-slider");
let velocityLabel = document.querySelector("#velocity-label");
let zoomSlider = document.querySelector("#zoom-slider");
let zoomLabel = document.querySelector("#zoom-label");
let addSourceButton = document.querySelector("#add-source-button");
let removeSourceButton = document.querySelector("#remove-source-button");
let startStopButton = document.querySelector("#start-stop-button");
let resetButton = document.querySelector("#reset-button");

////////// FULLSCREEN //////////
fullscreenButton.addEventListener("click", () => {
    doc.requestFullscreen().then(fullscreenMessage.style.display = "none");
});

document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        document.exitFullscreen().then(fullscreenMessage.style.display = "block");
    } 
})

////////// ADD VEHICLE INPUT //////////
vehicleSelect.addEventListener("change", () => {
    if (addingVehicle != Vehicles.NONE) {
        addingVehicle = vehicleSelect.value;
    }
    if (vehicleSelect.value == Vehicles.VEHICLE3A || vehicleSelect.value == Vehicles.VEHICLE3B) {
        startingVelocity.style.display = "block";
    } else {
        startingVelocity.style.display = "none";
    }

    if (vehicleSelect.value == Vehicles.VEHICLE4A) {
        velocityFunctionSelect.style.display = "block";
    } else {
        velocityFunctionSelect.style.display = "none";
    }
})

////////// VELOCITY SLIDER //////////
velocitySlider.addEventListener("change", () => {
    velocityLabel.innerHTML = `Starting Velocity: ${velocitySlider.value}`;
    vehicle3StartingVelocity = parseInt(velocitySlider.value);
})

////////// ZOOM SLIDER //////////
zoomSlider.addEventListener("input", () => {
    zoomLabel.innerHTML = `Zoom: ${zoomSlider.value}`;
    MAP_RESOLUTION = parseInt(zoomSlider.value);
    PIXEL_SIZE = MAP_LENGTH / MAP_RESOLUTION;
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

////////// VELOCITY FUNCTION SELECT //////////
velocityFunctionSelect.addEventListener("change", () => {
    console.log(velocityFunctionSelect.value == VelocityFunctions.SQRT);
    switch (velocityFunctionSelect.value) {
        case VelocityFunctions.SINUSOIDAL:
            velocityFunction = x => 100 * (Math.sin(x) + 1);
            break;
        case VelocityFunctions.QUADRATIC:
            velocityFunction = x => Math.pow(x, 2);
            break;
        case VelocityFunctions.SQRT:
            velocityFunction = x => Math.pow(x, 0.5);
            break;
        case VelocityFunctions.LOG:
            velocityFunction = x => Math.log(x + 1);
            break;
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