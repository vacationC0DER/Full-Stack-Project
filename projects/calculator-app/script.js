// script.js

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let currentInput = '';
let operator = '';
let firstOperand = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (value) {
            handleInput(value);
        }
    });
});

document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clearDisplay);

function handleInput(value) {
    if (isOperator(value)) {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else if (operator) {
            calculate();
        }
        operator = value;
        currentInput = '';
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}

function calculate() {
    if (operator && currentInput !== '') {
        const secondOperand = parseFloat(currentInput);
        let result;
        switch(operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
                break;
            default:
                return;
        }
        display.value = result;
        firstOperand = result !== 'Error' ? result : null;
        operator = '';
        currentInput = '';
    }
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    display.value = '';
}

function updateDisplay() {
    display.value = currentInput || (firstOperand !== null ? firstOperand : '');
}