let currentInput = "";
let lastOperator = "";

function appendValue(value) {
  currentInput += value;
  updateDisplay();
}

function appendOperator(operator) {

  if (currentInput === "" && operator !== "-") return;
  if (["+", "-", "*", "/"].includes(lastOperator)) {
    currentInput = currentInput.slice(0, -1);
  }
  currentInput += operator;
  lastOperator = operator;
  updateDisplay();
}

function appendDecimal() {

  const parts = currentInput.split(/[\+\-\*\/]/);
  const lastPart = parts[parts.length - 1];
  if (!lastPart.includes(".")) {
    currentInput += ".";
    updateDisplay();
  }
}

function clearDisplay() {
  currentInput = "";
  lastOperator = "";
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    currentInput = eval(currentInput).toString();
    lastOperator = "";
    updateDisplay();
  } catch (error) {
    currentInput = "Error";
    updateDisplay();
  }
}

function updateDisplay() {
  document.getElementById("display").value = currentInput;
}


document.addEventListener("keydown", (event) => {
  if ((event.key >= "0" && event.key <= "9") || event.key === ".") {
    appendValue(event.key);
  } else if (["+", "-", "*", "/"].includes(event.key)) {
    appendOperator(event.key);
  } else if (event.key === "Enter") {
    calculate();
  } else if (event.key === "Backspace") {
    deleteLast();
  } else if (event.key === "Escape") {
    clearDisplay();
  }
});
