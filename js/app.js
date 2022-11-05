let healthPoints = 0;
let powerPoints = 0;

function rollDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach((die) => {
        toggleClasses(die);
        die.dataset.roll = getRandomNumber(1, 6);
    });
}

function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayData() {
    document.getElementById("health-display").innerText = healthPoints.toString();
    document.getElementById("power-display").innerText = powerPoints.toString();

    if (localStorage.getItem("dead") === "true") {
        document.getElementById("dead-msg").classList.remove("is-hidden");
    } else {
        document.getElementById("dead-msg").classList.add("is-hidden");
    }
}

function addPower() {
    if (powerPoints < 16) {
        powerPoints += 1;
    }
    saveDataToStorage();
    displayData();
}

function addHealth() {
    if (healthPoints < 16) {
        healthPoints += 1;
    }

    if (healthPoints > 0) {
        localStorage.setItem("dead", "false");
    }
    saveDataToStorage();
    displayData();
}

function delHealth() {
    if (healthPoints > 0) {
        healthPoints -= 1;        
    }
    if (healthPoints <= 0) {
        localStorage.setItem("dead", "true");
    }
    saveDataToStorage();
    displayData();
}

function delPower() {
    if (powerPoints > 0) {
        powerPoints -= 1;
    }
    saveDataToStorage();
    displayData();
}


function loadDataFromStorage() {
    healthPoints = parseInt(localStorage.getItem("health"));
    powerPoints = parseInt(localStorage.getItem("power"));
}

function saveDataToStorage() {
    localStorage.setItem("health", healthPoints.toString());
    localStorage.setItem("power", powerPoints.toString());
}

function initData() {
    if (localStorage.getItem("health") === null) {
        localStorage.setItem("health", "0");
    }
    if (localStorage.getItem("power") === null) {
        localStorage.setItem("power", "0");
    }

    if (localStorage.getItem("dead") === null) {
        localStorage.setItem("dead", "false");
    }

    loadDataFromStorage();
    displayData();
}

document.getElementById("roll-dice").addEventListener("click", rollDice);
document.getElementById("del-health").addEventListener("click", delHealth);
document.getElementById("add-health").addEventListener("click", addHealth);
document.getElementById("del-power").addEventListener("click", delPower);
document.getElementById("add-power").addEventListener("click", addPower);
window.onload = initData;