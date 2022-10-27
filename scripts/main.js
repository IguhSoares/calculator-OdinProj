import msg from './messages.js';
import { calculate, parseResult, getNumber } from './calculator.js';
import Buffer from './buffer.js';

const display = document.getElementById('display');

const isOperator = val => ['+', '-', '×', '÷'].includes(val);

const clearDisplay = () => (display.innerText = '');

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

const getOperator = value => {
  const oprt = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷',
  };
  return oprt[value];
};

const updateOperator = val => {
  const displayText = display.innerText;
  if (isOperator(displayText.at(-1))) {
    display.innerText = displayText.slice(0, -1) + getOperator(val);
  }
};

const backspace = () => {
  const displayText = display.innerText;
  display.innerText = displayText.slice(0, -1);
};

const addPoint = () => {
  const displayText = display.innerText;
  let re1 = /\.\d*$/;
  const re2 = /[+\-×÷]\d+\.$/;
  if (!re1.test(displayText) && !re2.test(displayText)) {
    const regex = /^.+[+\-×÷]$/;
    display.innerText +=
      displayText === '' || regex.test(displayText) ? '0.' : '.';
  }
};
const equalsTo = () => {
  const displayText = display.innerText;
  if (/[+\-×÷]$/.test(displayText)) backspace();
  else {
    const secondNum = getNumber(display, 'second');
    if (secondNum) {
      try {
        const result = calculate(secondNum);
        clearDisplay();
        printToDisplay(parseResult(result));
      } catch (error) {
        msg.display(error);
      }
    }
  }
};

const initNumericKeys = () => {
  document.querySelectorAll('#numeric .key:not(.point)').forEach(k => {
    k.addEventListener('click', e => {
      try {
        printToDisplay(e.target.getAttribute('value'));
      } catch (err) {
        msg.display(err);
      }
    });
  });
};

const initBackspace = () => {
  document
    .querySelector('.key[value="bksp"]')
    .addEventListener('click', backspace);
};

const initPointKey = () => {
  document.querySelector('.point').addEventListener('click', addPoint);
};

const initOperators = () => {
  document.querySelectorAll('#operators .key').forEach(k => {
    k.addEventListener('click', e => {
      const displayText = display.innerText;
      const oprt = e.target.getAttribute('value');
      if (isOperator(displayText.at(-1))) updateOperator(oprt);
      else if (displayText === '' && oprt === '-') printToDisplay(oprt);
      else {
        const match = displayText.match(/^(\-?\d+(?:\.\d+)?)$/);
        if (match) {
          Buffer.add(match[0]);
          Buffer.add(oprt);
          printToDisplay(getOperator(oprt));
        }
      }
    });
  });
};

const initEqualsKey = () => {
  document.getElementById('equal-sign').addEventListener('click', equalsTo);
};

const start = () => {
  initNumericKeys();
  initBackspace();
  initPointKey();
  initOperators();
  initEqualsKey();
};

start();
