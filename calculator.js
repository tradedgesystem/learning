const display = document.getElementById('display');
let currentInput = '0';
let previousInput = null;
let operator = null;

const updateDisplay = () => {
  display.textContent = currentInput;
};

const clearAll = () => {
  currentInput = '0';
  previousInput = null;
  operator = null;
  updateDisplay();
};

const deleteLast = () => {
  if (currentInput === 'Error') {
    clearAll();
    return;
  }

  if (currentInput.length <= 1) {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
};

const appendNumber = (value) => {
  if (value === '.' && currentInput.includes('.')) return;
  if (currentInput === '0' && value !== '.') {
    currentInput = value;
  } else {
    currentInput += value;
  }
  updateDisplay();
};

const chooseOperator = (op) => {
  if (previousInput === null) {
    previousInput = currentInput;
  } else if (operator) {
    calculate();
  }
  operator = op;
  currentInput = '0';
};

const calculate = () => {
  if (operator === null || previousInput === null) return;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result = current;

  switch (operator) {
    case 'add':
      result = prev + current;
      break;
    case 'subtract':
      result = prev - current;
      break;
    case 'multiply':
      result = prev * current;
      break;
    case 'divide':
      result = current === 0 ? 'Error' : prev / current;
      break;
    default:
      return;
  }

  currentInput = String(result);
  previousInput = null;
  operator = null;
  updateDisplay();
};

document.querySelector('.buttons').addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName !== 'BUTTON') return;

  const value = target.dataset.value;
  const action = target.dataset.action;

  if (value !== undefined) {
    appendNumber(value);
    return;
  }

  if (action === 'clear') {
    clearAll();
    return;
  }

  if (action === 'delete') {
    deleteLast();
    return;
  }

  if (action === 'equals') {
    calculate();
    return;
  }

  if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
    chooseOperator(action);
  }
});
