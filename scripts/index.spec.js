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
  renderOnDisplay,
  updateOperator,
  backspace,
  addPoint,
  equalsTo,
} = require('./index');

document.body.innerHTML = `
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
