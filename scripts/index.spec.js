/**
 * renderOnDisplay
 * updateOperator
 * backspace
 * addPoint
 * equalsTo
 */
const {
  getNumber,
  writeToDisplay,
  addToBuffer,
  calculate,
} = require('./calculator');

const {
  initNumericKeys,
  printToDisplay,
  updateOperator,
  backspace,
  addPoint,
  equalsTo,
} = require('./index');

document.body.innerHTML = `
<div id="msg-area"></div>
<div id="calculator">
          <p id="display">9×9</p>
          <div id="keypad">
            <div id="numeric">
              <span class="key" value="1">1</span>
              <span class="key" value="2">2</span>
              <span class="key" value="3">3</span>
              <span class="key" value="4">4</span>
              <span class="key" value="5">5</span>
              <span class="key" value="6">6</span>
              <span class="key" value="7">7</span>
              <span class="key" value="8">8</span>
              <span class="key" value="9">9</span>
              <span class="key" value="0">0</span>
              <span class="key point" value=".">.</span>
            </div>
            <div id="operators">
              <span class="key" value="+">+</span>
              <span class="key" value="-">-</span>
              <span class="key" value="*">×</span>
              <span class="key" value="/">÷</span>
            </div>
            <div id="options">
              <span class="key" value="bksp">↩</span>
              <span id="equal-sign" class="key" value="=">=</span>
            </div>
          </div>
        </div>
`;
const display = document.getElementById('display');

describe('initNumericKeys', () => {
  initNumericKeys();
  const key = document.querySelector('.key[value="3"]');

  it('should trigger printToDisplay() by clicking .key element', () => {
    key.click();
    key.click();
    expect(printToDisplay).toBeCalledTimes(2);
  });

  it("should render a message when display's max limit is reached", () => {
    const msgArea = document.getElementById('msg-area');
    display.innerText = '99999999999999999999';
    key.click();
    expect(msgArea.innerText).toBe('Max limit reached');
  });
});

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
