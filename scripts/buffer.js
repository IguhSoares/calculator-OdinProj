const Buffer = (function () {
  let number = null;
  let op = null;

  const isFloat = n => n % 1 !== 0;
  const getNumberOfDigits = n =>
    n.toString().replace('-', '').replace('.', '').length;
  /** will accept numbers up to 15 digits only */
  const validateSize = value => getNumberOfDigits(value) < 16;

  const validateOperands = (x, y) => {
    const validator = {
      '+': validateSize(y),
      '-': validateSize(y),
      '*': (x, y) => getNumberOfDigits(x) + getNumberOfDigits(y) < 22,
      '/': (x, y) => getNumberOfDigits(y) - getNumberOfDigits(x) < 6,
    };
    return validator[op];
  };

  return {
    calc(x) {
      const operations = {
        '+': n => this.num + Number(n),
        '-': n => this.num - Number(n),
        '*': n => this.num * Number(n),
        '/': n => this.num / Number(n),
      };

      if (op === '/' && x === 0) throw new Error('Division by zero attempt');

      if (!validateOperands(number, x)) throw new Error('Number too large');

      let result = operations[op](x);
      if (isFloat(result)) {
        result = parseFloat(result.toFixed(15));
      }
      return result;
    },

    get num() {
      return number;
    },
    set num(n) {
      if (n === undefined)
        throw new TypeError('Number cannot be set to undefined');
      if (n !== null && typeof n !== 'number')
        throw new TypeError('Not a number');
      number = n;
    },

    get operator() {
      return op;
    },
    set operator(oprt) {
      if (number === null)
        throw new Error('Unable to set operator: no number in buffer');

      const valid = { '+': 1, '-': 1, '*': 1, '/': 1, null: 1 };
      if (valid[oprt] === undefined)
        throw new ReferenceError(`Invalid operator: ${oprt}`);

      op = oprt;
    },

    clear() {
      this.operator = null;
      this.num = null;
    },

    add(value) {
      if (!isNaN(Number(value))) {
        if (!validateSize(value)) {
          throw new Error('Number too large');
        }
        this.num = Number(value);
      } else if (['+', '-', '*', '/'].includes(value)) this.operator = value;
    },
  };
})();

export default Buffer; /** ES6 export */
