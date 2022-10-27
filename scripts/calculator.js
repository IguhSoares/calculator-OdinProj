import Buffer from './buffer.js';

const FIRST_NUM_REGEX = /^(\-?\d+(?:\.\d+)?)[+\-÷×]$/;
/** second number can never be negative, as the interface should not allow it */
const SECOND_NUM_REGEX = /^\-?\d+(?:\.\d+)?[+\-÷×](\-?\d+(?:\.\d+)?)$/;
Object.freeze(FIRST_NUM_REGEX);
Object.freeze(SECOND_NUM_REGEX);

const getNumber = (display, position = 'first') => {
  const regex = position === 'first' ? FIRST_NUM_REGEX : SECOND_NUM_REGEX;
  const value = display.innerText;
  const match = value.match(regex);
  return match ? match[1] : null;
};

const parseResult = (result, op = null) => result + (op ? op : '');

/** if an operator is passed, the result is saved to the buffer
 * along with the operator for the next operation */
const calculate = (value, operator = null) => {
  const result = Buffer.calc(Number(value));
  Buffer.clear();
  if (operator) {
    Buffer.add(result);
    Buffer.add(operator);
  }

  return result;
};

export { calculate, parseResult, getNumber };
