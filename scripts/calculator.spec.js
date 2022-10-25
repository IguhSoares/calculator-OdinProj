const { getNumber } = require('./calculator');

describe('Calculator', () => {
  document.body.innerHTML = '<div id="display"></div>';
  it('should get first number from display', () => {
    const display = document.getElementById('display');
    display.innerText = '14.7÷';

    expect(getNumber(display)).toBe('14.7');
  });

  it('should get second number from display', () => {
    const display = document.getElementById('display');
    display.innerText = '14.7÷3.42';

    expect(getNumber(display, 'second')).toBe('3.42');
  });
});
