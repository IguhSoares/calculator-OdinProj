import msg from './messages.js';
import { calculate, writeToDisplay, getNumber } from './calculator.js';

const display = document.getElementById('display');

const isOperator = val => ['+', '-', '×', '÷'].includes(val);

const printToDisplay = val => {
  if (display.innerText.length >= 20) throw 'Max limit reached';
  const itIsOperator = isOperator(val);
  if (!itIsOperator || (itIsOperator && val === '-')) display.innerText += val;
};

const updateOperator = val => {
  const displayText = display.innerText;
  const oprt = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷',
  };
  console.log(isOperator(displayText.at(-1)));
  if (isOperator(displayText.at(-1))) {
    display.innerText = displayText.slice(0, -1) + oprt[val];
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
      console.log(displayText);
      const operator = e.target.getAttribute('value');
      if (isOperator(displayText.at(-1))) updateOperator(operator);
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
};

start();
