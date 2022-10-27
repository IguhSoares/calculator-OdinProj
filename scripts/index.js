// import {
//   calculate,
//   addToBuffer,
//   writeToDisplay,
//   getNumber,
// } from './calculator';
const { calculate, writeToDisplay, getNumber } = require('./calculator');

// const display = document.getElementById('display');

const isFloat = n => n % 1 !== 0;
const isOperator = val => ['+', '-', '*', '/'].includes(val);

const printToDisplay = val => {
  const displayText = display.innerText;
  if (displayText.length >= 20) throw 'Max limit reached';
  const itIsOperator = isOperator(val);
  if (
    !itIsOperator ||
    (displayText === '' && val === '-') ||
    /\d+$/.test(displayText)
  ) {
    display.innerText += val;
  }
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
  let re1 = /\.\d*$/;
  const re2 = /[+|\-|×|÷]\d+\.$/;
  if (!re1.test(displayText) && !re2.test(displayText)) {
    const regex = /^.+[+|\-|×|÷]$/;
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

module.exports = {
  printToDisplay,
  updateOperator,
  backspace,
  addPoint,
  equalsTo,
};
