import {
  handleNumberInput,
  handleFocus,
  initializeEventListeners,
} from './initialize/calBtns.mjs';
import { toggleFraction } from './fraction/index.mjs';
/* import { setupDropdownMenu } from './render/Utils/dropdownUtils.mjs'; */
/* import { setupSelection } from './render/Utils/selectionUtils.mjs'; clearSelectedDivs */
import { clearAllDivs } from './clear/index.mjs';

const dropdownMenu = document.querySelector('.dropdown-menu');
const parentDiv = document.querySelector('.parent');

const clearButton = document.getElementById('clearButton');

let fractionMode = false;

document
  .getElementById('fractionButton')
  .addEventListener('click', function () {
    fractionMode = true;
  });

/* setupDropdownMenu(parentDiv, dropdownMenu);
 */
/* setupSelection(parentDiv); */

clearButton.addEventListener('click', function () {
  clearAllDivs();
});

/* document
  .getElementById('removeButton')
  .addEventListener('click', clearSelectedDivs); */

document.addEventListener('DOMContentLoaded', function () {
  initializeEventListeners();
});

function renderDivs(numberOfDivs) {
  const parentDiv = document.querySelector('.parent');

  for (let i = 0; i < numberOfDivs; i++) {
    const div = document.createElement('div');
    div.contentEditable = 'true';
    div.innerHTML = '&nbsp;';
    div.classList.add('numbers');

    div.addEventListener('input', handleNumberInput);
    div.addEventListener('focus', handleFocus);
    div.addEventListener('click', function () {
      if (fractionMode) {
        toggleFraction(this);
        fractionMode = false;
      }
    });

    parentDiv.appendChild(div);
  }
}

window.addEventListener('load', function () {
  renderDivs(48);
});
