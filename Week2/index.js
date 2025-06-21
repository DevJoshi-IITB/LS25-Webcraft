const display = document.getElementById("display")


function calculate() {
    exp = display.value
    display.value = eval(display.value);
}
function appendToDisplay(input) {
    display.value += input;
}

function allClear() {
    display.value = "";
}

function plusMinus() {
    display.value = -display.value;
}

function percentage() {
    display.value = display.value / 100;
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

document.addEventListener("keydown", function (event) {
    const validKeys = "0123456789+-*/.%";
    if (validKeys.includes(event.key)) {
        appendToDisplay(event.key);
    }
    if (event.key === "Backspace") {
        backspace();
    }
    if (event.key === "Enter") {
        calculate();
        event.preventDefault();
    }
});