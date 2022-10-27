// import buffer from './buffer.js';
const { buffer } = require('./buffer');

const FIRST_NUM_REGEX = /^(\-?\d+\.?\d+)[+|\-|÷|×]$/;
/** second number can never be negative, as the interface should not allow it */
const SECOND_NUM_REGEX = /^\-?\d+\.?\d+[+|\-|÷|×](\d+\.?\d+)$/;
Object.freeze(FIRST_NUM_REGEX);
Object.freeze(SECOND_NUM_REGEX);

const getNumber = (display, position = 'first') => {
  const regex = position === 'first' ? FIRST_NUM_REGEX : SECOND_NUM_REGEX;
  const value = display.innerText;
  const match = value.match(regex);
  return match ? match[1] : null;
};

const writeToDisplay = (display, result, op = null) => {
  display.innerText = result + (op ? op : '');
};

const addToBuffer = (value, type = 'number') => {
  if (typeof Number(value) === 'number') buffer.num = Number(value);
  else if (['+', '-', '*', '/'].includes(value)) buffer.operator = value;
};

/** if an operator is passed, the result is saved to the buffer
 * along with the operator for the next operation */
const calculate = (value, operator = null) => {
  const result = buffer.calc(Number(value));
  buffer.clear();
  if (operator) {
    buffer.num = result;
    buffer.operator = operator;
  }

  return result;
};

// export { calculate, addToBuffer, writeToDisplay, getNumber };

module.exports = {
  getNumber,
  writeToDisplay,
  addToBuffer,
  calculate,
  FIRST_NUM_REGEX,
};
