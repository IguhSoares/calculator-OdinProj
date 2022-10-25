const buffer = {
  num: null,
  operand: null,
  calc(x) {
    const operations = {
      '+': n => this.num + n,
      '-': n => this.num - n,
      '*': n => this.num * n,
      '/': n => this.num / n,
    };

    return operations[this.operand](x);
  },
};

module.exports = {
  buffer,
};
