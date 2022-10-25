const { getNumber } = require('./calculator');

describe('Calculator', () => {
  document.body.innerHTML = '<div id="display"></div>';
  const display = document.getElementById('display');
  it('should get first number from display (division)', () => {
    display.innerText = '14.7÷';
    expect(getNumber(display)).toBe('14.7');
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
