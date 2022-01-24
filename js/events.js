/********* DOM ELEMENTS *********/
let doc = document.documentElement;
let fullscreenButton = document.querySelector("#fullscreen-button");
let fullscreenMessage = document.querySelector("#fullscreen-message");
let aboutButton = document.querySelector("#about-button");
let aboutModal = document.querySelector("#about-modal");
let howToButton = document.querySelector("#how-to-button");
let howToModal = document.querySelector("#how-to-modal");
let closeModalButtons = document.querySelectorAll(".modal-close");

////////// CONTROLS //////////
let startStopButton = document.querySelector("#start-stop-button");
let resetButton = document.querySelector("#reset-button");
let zoomSlider = document.querySelector("#zoom-slider");
let zoomLabel = document.querySelector("#zoom-label");

////////// VEHICLES //////////
let vehicleSelect = document.querySelector("#vehicle-select");
let addVehicleButton = document.querySelector("#add-vehicle-button");
let removeAllVehiclesButton = document.querySelector("#remove-all-vehicles-button");
let vehicle4aSelect = document.querySelector("#vehicle-4a-select");
let vehicle4bSelect = document.querySelector("#vehicle-4b-select");
let startingVelocity = document.querySelector("#starting-velocity");
let velocitySlider = document.querySelector("#velocity-slider");
let velocityLabel = document.querySelector("#velocity-label");

////////// SOURCES //////////
let addSourceButton = document.querySelector("#add-source-button");
let removeSourceButton = document.querySelector("#remove-source-button");
let removeAllSourcesButton = document.querySelector("#remove-all-sources-button");

/********* EVENT HANDLING *********/
////////// FULLSCREEN //////////
fullscreenButton.addEventListener("click", () => {
    doc.requestFullscreen().then(fullscreenMessage.style.display = "none");
});

document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        document.exitFullscreen().then(fullscreenMessage.style.display = "block");
    }
});

////////// MODALS //////////
aboutButton.addEventListener("click", () => {
    aboutModal.style.display = "block";
});

howToButton.addEventListener("click", () => {
    howToModal.style.display = "block";
});

for (closeModalButton of closeModalButtons) {
    closeModalButton.addEventListener("click", () => {
        aboutModal.style.display = "none";
        howToModal.style.display = "none";
    });
}

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
        velocityFunction = VELOCITY_FUNCTIONS[vehicle4aSelect.value];
        vehicle4aSelect.style.display = "block";
    } else {
        vehicle4aSelect.style.display = "none";
    }

    if (vehicleSelect.value == Vehicles.VEHICLE4B) {
        velocityFunction = VELOCITY_FUNCTIONS[vehicle4bSelect.value];
        vehicle4bSelect.style.display = "block";
    } else {
        vehicle4bSelect.style.display = "none";
    }
});

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
    Renderer.graphicsSetup();
    resetCanvas();
    generateTerrain();
    renderTerrain();
});

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

////////// REMOVE ALL VEHICLES BUTTON //////////
removeAllVehiclesButton.addEventListener("click", () => {
    u.vehicles = [];
})

////////// VELOCITY FUNCTION SELECTS //////////
vehicle4aSelect.addEventListener("change", () => {
    velocityFunction = VELOCITY_FUNCTIONS[vehicle4aSelect.value];
});

vehicle4bSelect.addEventListener("change", () => {
    velocityFunction = VELOCITY_FUNCTIONS[vehicle4bSelect.value];
})

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

});

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
});

////////// REMOVE ALL SOURCES ///////////
removeAllSourcesButton.addEventListener("click", () => {
    u.sources = [];
    resetCanvas();
    generateTerrain();
    renderTerrain();
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
    zoomLabel.innerHTML = "Zoom: 100";
    zoomSlider.value = 100;
    MAP_RESOLUTION = 100;
    PIXEL_SIZE = MAP_LENGTH / MAP_RESOLUTION;
    Renderer.graphicsSetup();
    resetUniverse();
});