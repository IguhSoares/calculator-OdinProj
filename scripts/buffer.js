const buffer = {
  number: null,
  op: null,
  calc(x) {
    const operations = {
      '+': n => this.num + n,
      '-': n => this.num - n,
      '*': n => this.num * n,
      '/': n => this.num / n,
    };
    const isFloat = n => n % 1 !== 0;

    if (this.operator === '/' && x === 0)
      throw new Error('Division by zero attempt');

    let result = operations[this.operator](x);
    if (isFloat(result)) {
      result = parseFloat(result.toFixed(15));
    }
    return result;
  },
  get num() {
    return this.number;
  },
  set num(n) {
    if (n === undefined)
      throw new TypeError('Number cannot be set to undefined');
    if (n !== null && typeof n !== 'number')
      throw new TypeError('Not a number');
    this.number = n;
  },
  get operator() {
    return this.op;
  },
  set operator(oprt) {
    if (this.number === null)
      throw new Error('Unable to set operator: no number in buffer');

    const valid = { '+': 1, '-': 1, '*': 1, '/': 1, null: 1 };
    if (valid[oprt] === undefined)
      throw new ReferenceError(`Invalid operator: ${oprt}`);

    this.op = oprt;
  },
  clear() {
    this.operator = null;
    this.num = null;
  },
};

export default buffer; /** ES6 export */
