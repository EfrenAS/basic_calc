document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
  keyPressed();
});

const keyboard = {
  numberKeys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  specialsKeys: ["Escape", "Enter", "Backspace", "Delete", ".", "="],
  operatorKeys: ["+", "-", "*", "/"],
};

const operations = {
  "+": () => { return values.reduce((accumulator, currentValue) => accumulator + currentValue); },
  "-": () => { return values.reduce((accumulator, currentValue) => accumulator - currentValue); },
  "*": () => { return values.reduce((accumulator, currentValue) => accumulator * currentValue); },
  "/": () => { return values.reduce((accumulator, currentValue) => accumulator / currentValue); }
}

const values = [];
const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".btn");

function eventListeners() {
  numbers.forEach((element) => {
    element.addEventListener("click", (evt) => searchKey(evt.target.innerHTML));
  });
}

function keyPressed() {
  document.onkeydown = (evt) => searchKey(evt.key);
}

function searchKey(value) {
  for (const property in keyboard) {
    if (keyboard[property].includes(value)) {
      actionsKey(property, value);
    }
  }
}

function setValues() {
  values.push(parseInt(display.innerHTML));
  display.innerHTML = "0";
}

function actionsKey(key, value) {
  switch (key) {
    case "numberKeys":
      showOnDisplay(value);
      break;
    case "operatorKeys":
      setValues();
      runOperation(value);
      break;
    default:
      break;
  }
}

function runOperation(value) {

  if (values.length === 2) {
    operation = operations[value];
    showOnDisplay(operation.apply());
  }
}

function showOnDisplay(value) {
  display.innerHTML === "0"
    ? (display.innerHTML = value)
    : (display.innerHTML += value);

  if (display.innerHTML.length >= 7) {
    display.classList.add("md-font");
  }
}

function changeColorkey() {}

function clearDisplay() {
  values = [];
  display.innerHTML = "0";
}
