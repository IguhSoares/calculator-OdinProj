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
  return value.match(regex)[1];
};

const writeToDisplay = (display, result, op = null) => {
  display.innerText = result + (op ? op : '');
};

const addToBuffer = (value, type = 'number') => {
  if (type === 'number') buffer.num = Number(value);
  else if (type === 'operator') buffer.operator = value;
};

const calculate = value => {
  const result = buffer.calc(Number(value));
  buffer.clear();
  buffer.num = result;

  return result;
};

module.exports = {
  getNumber,
  writeToDisplay,
  addToBuffer,
  calculate,
};
