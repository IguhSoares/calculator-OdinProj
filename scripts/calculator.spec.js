const { Buffer } = require('./buffer');
const { getNumber, writeToDisplay, calculate } = require('./calculator');

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

  it('should return null if no first number', () => {
    display.innerText = '';
    expect(getNumber(display)).toBe(null);

    display.innerText = '-';
    expect(getNumber(display)).toBe(null);
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

  it('should return null if no second number', () => {
    display.innerText = '127-';
    expect(getNumber(display, 'second')).toBe(null);
  });
});

describe('writeToDisplay method', () => {
  it('should render the result on the display', () => {
    display.innerText = '127×15';
    Buffer.num = 127;
    Buffer.operator = '*';
    const result = Buffer.calc(getNumber(display, 'second'));
    writeToDisplay(display, result);
    expect(display.innerText).toBe('1905');
  });

  it('should render the result on the display, keeping the last operator', () => {
    display.innerText = '127×15';
    Buffer.num = 127;
    Buffer.operator = '*';
    const result = Buffer.calc(getNumber(display, 'second'));
    writeToDisplay(display, result, '÷');
    expect(display.innerText).toBe('1905÷');
  });
});

describe('calculate method', () => {
  it('should convert string argument to number', () => {
    Buffer.num = 4;
    Buffer.operator = '*';
    expect(calculate('3')).toBe(12);
  });

  it('should calculate and save the result to the buffer', () => {
    Buffer.num = -23.72;
    Buffer.operator = '/';
    calculate('9.75', '+');
    expect(Buffer.num).toBe(-2.432820512820513);
  });

  it('should calculate and save the next operator to the buffer', () => {
    Buffer.num = -23.72;
    Buffer.operator = '/';
    calculate('9.75', '+');
    expect(Buffer.operator).toBe('+');
  });
});
