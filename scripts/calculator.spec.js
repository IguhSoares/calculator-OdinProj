const { buffer } = require('./buffer');
const {
  getNumber,
  writeToDisplay,
  addToBuffer,
  calculate,
} = require('./calculator');

describe('getNumber method', () => {
  document.body.innerHTML = '<div id="display"></div>';
  const display = document.getElementById('display');
  it('should get first number from display (division)', () => {
    display.innerText = '14.7÷';
    expect(getNumber(display)).toBe('14.7');
  });

  it('should get first number from display (negative)', () => {
    display.innerText = '-14.7÷';
    expect(getNumber(display)).toBe('-14.7');
  });

  it('should get first number from display (multiplication)', () => {
    display.innerText = '127×';
    expect(getNumber(display)).toBe('127');
  });

  it('should get first number from display (sum)', () => {
    display.innerText = '127+';
    expect(getNumber(display)).toBe('127');
  });

  it('should get first number from display (subtraction)', () => {
    display.innerText = '127-';
    expect(getNumber(display)).toBe('127');
  });

  it('should get second number from display (division)', () => {
    const display = document.getElementById('display');
    display.innerText = '14.7÷3.42';
    expect(getNumber(display, 'second')).toBe('3.42');
  });

  it('should get second number from display (multiplication)', () => {
    display.innerText = '127×15';
    expect(getNumber(display, 'second')).toBe('15');
  });

  it('should get second number from display (sum)', () => {
    display.innerText = '127+15';
    expect(getNumber(display, 'second')).toBe('15');
  });

  it('should get second number from display (subtraction)', () => {
    display.innerText = '127-15';
    expect(getNumber(display, 'second')).toBe('15');
  });
});

describe('writeToDisplay method', () => {
  it('should render the result on the display', () => {
    display.innerText = '127×15';
    buffer.num = 127;
    buffer.operator = '*';
    const result = buffer.calc(getNumber(display, 'second'));
    writeToDisplay(display, result);
    expect(display.innerText).toBe('1905');
  });

  it('should render the result on the display, keeping the last operator', () => {
    display.innerText = '127×15';
    buffer.num = 127;
    buffer.operator = '*';
    const result = buffer.calc(getNumber(display, 'second'));
    writeToDisplay(display, result, '÷');
    expect(display.innerText).toBe('1905÷');
  });
});

describe('addToBuffer method', () => {
  it('should set buffer.num', () => {
    display.innerText = '127.74×';
    addToBuffer(getNumber(display));
    expect(buffer.num).toBe(127.74);
  });

  it('should set buffer.operator', () => {
    addToBuffer('*', 'operator');
    expect(buffer.operator).toBe('*');
  });
});

describe('calculate method', () => {
  it('should convert string argument to number', () => {
    buffer.num = 4;
    buffer.operator = '*';
    expect(calculate('3')).toBe(12);
  });

  it('should calculate and save the result to the buffer', () => {
    buffer.num = -23.72;
    buffer.operator = '/';
    calculate('9.75', '+');
    expect(buffer.num).toBe(-2.432820512820513);
  });

  it('should calculate and save the next operator to the buffer', () => {
    buffer.num = -23.72;
    buffer.operator = '/';
    calculate('9.75', '+');
    expect(buffer.operator).toBe('+');
  });
});
