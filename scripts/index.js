import { calculate, writeToDisplay, getNumber } from './calculator.js';

const display = document.getElementById('display');

const isOperator = val => ['+', '-', '*', '/'].includes(val);

const printToDisplay = val => {
  if (display.innerText.length >= 20) throw 'Max limit reached';
  const itIsOperator = isOperator(val);
  if (!itIsOperator || (itIsOperator && val === '-')) display.innerText += val;
};

const updateOperator = oprt => {
  const displayText = display.innerText;
  if (isOperator(displayText.at(-1))) {
    display.innerText = displayText.slice(0, -1) + oprt;
  }
};

const backspace = () => {
  const displayText = display.innerText;
  display.innerText = displayText.slice(0, -1);
};

const addPoint = () => {
  const displayText = display.innerText;
  let regex = /^\d+\.\d*[+|\-|×|÷]?(\d+\.\d+)?$/;
  if (!regex.test(displayText)) {
    regex = /^.+[+|\-|×|÷]$/;
    display.innerText +=
      displayText === '' || regex.test(displayText) ? '0.' : '.';
  }
};
const equalsTo = () => {
  const displayText = display.innerText;
  if (/[+|\-|×|÷]$/.test(displayText)) backspace();
  else {
    const secondNum = getNumber(display, 'second');
    if (secondNum) {
      const result = calculate(secondNum);
      writeToDisplay(display, result);
    }
  }
};
