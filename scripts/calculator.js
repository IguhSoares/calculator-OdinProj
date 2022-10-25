const buffer = {
  num: null,
  operator: null,
  calc(x) {
    const operations = {
      '+': n => this.num + n,
      '-': n => this.num - n,
      '*': n => this.num * n,
      '/': n => this.num / n,
    };

    return operations[this.operator](x);
  },
};

module.exports = {
  buffer,
};
