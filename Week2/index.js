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