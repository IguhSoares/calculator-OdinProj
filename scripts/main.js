import msg from './messages.js';
import { calculate, parseResult, getNumber } from './calculator.js';
import Buffer from './buffer.js';

const display = document.getElementById('display');
Object.freeze(display);

const isOperator = val => /[+\-×÷]/.test(val);

const clearDisplay = () => (display.innerText = '0');

const printToDisplay = val => {
  const displayText = display.innerText;
  if (displayText.length >= 20) throw 'Max limit reached';

  if (!isOperator(val) || val === '-' || /\d+$/.test(displayText)) {
    if (displayText === '0') display.innerText = val;
    else display.innerText += val;
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
  if (display.innerText === '') display.innerText = '0';
};

const addPoint = () => {
  const displayText = display.innerText;

  let re1 = /\.\d*$/;
  const re2 = /[+\-×÷]\d+\.$/;
  if (!re1.test(displayText) && !re2.test(displayText)) {
    const regex = /^.+[+\-×÷]$/;
    display.innerText += regex.test(displayText) ? '0.' : '.';
  }
};

const equalsTo = () => {
  const displayText = display.innerText;

  if (/[+\-×÷]$/.test(displayText)) backspace();
  else {
    const secondNum = getNumber(display, 'second');
    if (secondNum) {
      try {
        clearDisplay();
        printToDisplay(parseResult(calculate(secondNum)));
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
      else if (displayText === '0' && oprt === '-') {
        printToDisplay(oprt);
      } else if (displayText !== '0') {
        const match = displayText.match(/^(\-?\d+(?:\.\d+)?)$/);
        if (match) {
          /** match the number in the display */
          try {
            Buffer.add(match[0]);
            Buffer.add(oprt);
            printToDisplay(getOperator(oprt));
          } catch (error) {
            msg.display(error);
          }
        }
      }
    });
  });
};

const initEqualsKey = () => {
  document.getElementById('equal-sign').addEventListener('click', equalsTo);
};

const initClearKey = () => {
  document
    .querySelector('.key[value="Delete"]')
    .addEventListener('click', clearDisplay);
};

const initKeyboardSupport = () => {
  const triggerClick = val => {
    document
      .querySelector(`.key[value="${val}"]`)
      .dispatchEvent(new Event('click'));
  };

  const isValidKey = k => /^([0-9-+*\/\.=\s]|Backspace|Delete)$/.test(k);

  document.querySelector('#keypad').addEventListener('keydown', e => {
    if (isValidKey(e.key)) {
      e.preventDefault();

      if (e.key === ' ' || e.key === '=') {
        triggerClick('=');
      } else if (e.key === 'Backspace') {
        triggerClick('bksp');
      } else {
        triggerClick(e.key);
      }
    }
  });
};

const start = () => {
  initNumericKeys();
  initBackspace();
  initPointKey();
  initOperators();
  initEqualsKey();
  initClearKey();
  initKeyboardSupport();
};

start();
