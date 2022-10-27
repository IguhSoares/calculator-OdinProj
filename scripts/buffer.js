const Buffer = (function () {
  let number = null;
  let op = null;

  const isFloat = n => n % 1 !== 0;
  return {
    calc(x) {
      const operations = {
        '+': n => this.num + n,
        '-': n => this.num - n,
        '*': n => this.num * n,
        '/': n => this.num / n,
      };

      if (op === '/' && x === 0) throw new Error('Division by zero attempt');

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
      if (!isNaN(Number(value))) this.num = Number(value);
      else if (['+', '-', '*', '/'].includes(value)) this.operator = value;
    },
  };
})();

export default Buffer; /** ES6 export */
