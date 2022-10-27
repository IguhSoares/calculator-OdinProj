const { buffer } = require('./buffer');

const {
  printToDisplay,
  updateOperator,
  backspace,
  addPoint,
  equalsTo,
} = require('./main');

document.body.innerHTML = `<p id="display">9×9</p>`;
const display = document.getElementById('display');

describe('printToDisplay', () => {
  it('should print to the display, appending to what is already being displayed', () => {
    display.innerText = '';
    printToDisplay('3');
    expect(display.innerText).toBe('3');

    printToDisplay('7');
    expect(display.innerText).toBe('37');
  });

  it('should limit the length to a maximum of 20 characters', () => {
    display.innerText = '99999999999999999999';
    expect(() => printToDisplay('1')).toThrow('Max limit reached');
  });

  it("should render an operator on empty display, only if it's a minus sign", () => {
    display.innerText = '';
    printToDisplay('*');
    expect(display.innerText).toBe('');

    printToDisplay('+');
    expect(display.innerText).toBe('');

    printToDisplay('/');
    expect(display.innerText).toBe('');

    printToDisplay('-');
    expect(display.innerText).toBe('-');
  });
});

describe('updateOperator', () => {
  it('should change the operator being displayed to the operator that was clicked', () => {
    display.innerText = '37+';
    updateOperator('×');
    expect(display.innerText).toBe('37×');
  });
});

describe('backspace', () => {
  it('should erase the rightmost character in the display', () => {
    display.innerText = '37+';
    backspace();
    expect(display.innerText).toBe('37');
    backspace();
    expect(display.innerText).toBe('3');
    backspace();
    expect(display.innerText).toBe('');
  });

  it('should not fail when display is empty', () => {
    display.innerText = '';
    expect(() => {
      backspace();
    }).not.toThrowError();
  });
});

describe('addPoint', () => {
  it('should add a decimal point to the display', () => {
    display.innerText = '3';
    addPoint();
    expect(display.innerText).toBe('3.');
  });

  it('should do nothing if number has already a decimal point', () => {
    display.innerText = '3.';
    addPoint();
    expect(display.innerText).toBe('3.');

    display.innerText = '3.7';
    addPoint();
    expect(display.innerText).toBe('3.7');

    display.innerText = '3.7+4.53';
    addPoint();
    expect(display.innerText).toBe('3.7+4.53');
  });

  it("should add a leading zero if there's no number preceding the point", () => {
    display.innerText = '';
    addPoint();
    expect(display.innerText).toBe('0.');

    display.innerText = '37-';
    addPoint();
    expect(display.innerText).toBe('37-0.');
  });
});

describe('equalsTo', () => {
  it('should calculate and print the result to the display', () => {
    display.innerText = '3.7×4.3';
    buffer.num = 3.7;
    buffer.operator = '*';
    equalsTo();
    expect(display.innerText).toBe('15.91');
  });

  it("should remove the operator if there's no number after it", () => {
    display.innerText = '49÷';
    equalsTo();
    expect(display.innerText).toBe('49');
  });

  it("should do nothing if there's no operator in the display", () => {
    display.innerText = '-372';
    equalsTo();
    expect(display.innerText).toBe('-372');
  });
});
