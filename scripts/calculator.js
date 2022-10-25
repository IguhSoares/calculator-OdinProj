// import buffer from './buffer.js';
const { buffer } = require('./buffer');

const FIRST_NUM_REGEX = /^(\d+\.?\d+)[+|\-|÷|×]$/;
const SECOND_NUM_REGEX = /^\d+\.?\d+[+|\-|÷|×](\d+\.?\d+)$/;
Object.freeze(FIRST_NUM_REGEX);
Object.freeze(SECOND_NUM_REGEX);

const getNumber = (display, position = 'first') => {
  const regex = position === 'first' ? FIRST_NUM_REGEX : SECOND_NUM_REGEX;
  const value = display.innerText;
  return value.match(regex)[1];
};

module.exports = {
  getNumber,
};
