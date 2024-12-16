// Get the display element
const display = document.getElementById("display");

// Track Caps Lock and Shift states
let isCapsOn = false;
let isShiftOn = false;

// Function to toggle Caps Lock
function toggleCapsLock() {
    // Select all alphabet buttons
    const letterButtons = document.querySelectorAll(".row3 button, .row4 button, .row5 button");
    letterButtons.forEach((button) => {
        const isLetter = /^[a-zA-Z]$/.test(button.textContent.trim());
        if (isLetter) {
            button.textContent = isCapsOn 
                ? button.textContent.trim().toUpperCase() 
                : button.textContent.trim().toLowerCase();
        }
    });

    // Optionally style the Caps button to indicate the state
    const capsButton = document.querySelector(".caps");
    capsButton.style.backgroundColor = isCapsOn ? "#555" : "#0f0303";
    capsButton.style.color = isCapsOn ? "white" : "inherit";
}

// Function to temporarily apply Shift
function applyShift() {
    isShiftOn = true;
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        const text = button.textContent.trim();
        if (text.length === 1) {
            button.textContent = text.toUpperCase();
        } else if (text === "-") {
            button.textContent = "_";
        } else if (text === "=") {
            button.textContent = "+";
        } else if (text === "[") {
            button.textContent = "{";
        } else if (text === "]") {
            button.textContent = "}";
        } else if (text === "\\") {
            button.textContent = "|";
        } else if (text === ";") {
            button.textContent = ":";
        } else if (text === "'") {
            button.textContent = "\"";
        } else if (text === ",") {
            button.textContent = "<";
        } else if (text === ".") {
            button.textContent = ">";
        } else if (text === "/") {
            button.textContent = "?";
        }
    });
}

// Function to revert Shift
function revertShift() {
    isShiftOn = false;
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        const text = button.textContent.trim();
        if (text.length === 1) {
            button.textContent = text.toLowerCase();
        } else if (text === "_") {
            button.textContent = "-";
        } else if (text === "=") {
            button.textContent = "+";
        } else if (text === "{") {
            button.textContent = "[";
        } else if (text === "}") {
            button.textContent = "]";
        } else if (text === "|") {
            button.textContent = "\\";
        } else if (text === ":") {
            button.textContent = ";";
        } else if (text === "\"") {
            button.textContent = "'";
        } else if (text === "<") {
            button.textContent = ",";
        } else if (text === ">") {
            button.textContent = ".";
        } else if (text === "?") {
            button.textContent = "/";
        }
    });
}

// Add event listeners to all buttons
document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("backspace")) {
            // Handle backspace
            display.textContent = display.textContent.slice(0, -1);
        } else if (button.classList.contains("space")) {
            // Handle space
            display.textContent += " ";
        } else if (button.classList.contains("caps")) {
            // Toggle Caps Lock state
            isCapsOn = !isCapsOn;
            toggleCapsLock();
        } else if (button.classList.contains("tab")) {
            // Handle Tab
            display.textContent += "    "; // Add 4 spaces
        } else if (button.classList.contains("enter")) {
            // Handle Enter
            display.textContent += "\n"; // Add a newline
        } else if (button.classList.contains("shift")) {
            // Handle Shift (temporarily apply)
            if (!isShiftOn) {
                applyShift();
                setTimeout(revertShift, 200); // Revert after a short time
            }
        } else if (button.classList.contains("ctrl")) {
            // Handle Ctrl (custom behavior can be added here)
            alert("Ctrl key functionality not implemented!");
        } else if (button.classList.contains("win")) {
            // Handle Win key (custom behavior can be added here)
            alert("Win key functionality not implemented!");
        } else if (button.classList.contains("alt")) {
            // Handle Alt key (custom behavior can be added here)
            alert("Alt key functionality not implemented!");
        } else {
            // Append button text to display
            const text = button.textContent.trim();
            display.textContent += isShiftOn && !isCapsOn
                ? text.toUpperCase()
                : isCapsOn && !isShiftOn
                ? text.toUpperCase()
                : text.toLowerCase();
        }
    });
});
