import { initializeEventListeners } from './initialize/calBtns.mjs';
import { handleNumberInput, handleFocus } from './initialize/deleteContent.mjs';
import { toggleFraction } from './fraction/index.mjs';
import { clearAllDivs, clearSelectedDivs } from './clear/index.mjs';
import { toggleSelected } from './Utils/toggleSelected.mjs';
import { applyBorderToDivs } from './border/index.mjs';

let fractionMode = false;

document
  .getElementById('fractionButton')
  .addEventListener('click', function () {
    fractionMode = true;
  });

document
  .getElementById('doubleLineItem')
  .addEventListener('click', function () {
    applyBorderToDivs('double-line');
  });

document
  .getElementById('singleLineItem')
  .addEventListener('click', function () {
    applyBorderToDivs('single-line');
  });

document.getElementById('clearButton').addEventListener('click', function () {
  clearAllDivs();
});

document
  .getElementById('clearSelected')
  .addEventListener('click', clearSelectedDivs);

document.addEventListener('DOMContentLoaded', function () {
  initializeEventListeners();
  const divs = document.querySelectorAll('.numbers');
  divs.forEach((div) => {
    div.addEventListener('click', toggleSelected);
    console.log('Event listener added to: ', div);
  });
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

  const divs = document.querySelectorAll('.numbers');
  divs.forEach((div) => {
    div.addEventListener('click', toggleSelected);
  });
}

window.addEventListener('load', function () {
  renderDivs(85);
});
