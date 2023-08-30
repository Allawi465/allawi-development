import { initializeEventListeners } from './initialize/calBtns.mjs';
import { handleNumberInput, handleFocus } from './initialize/deleteContent.mjs';
import { toggleFraction } from './fraction/index.mjs';
import { clearAllDivs, clearSelectedDivs } from './clear/index.mjs';
import { toggleSelected } from './Utils/toggleSelected.mjs';
import { applyBorderToDivs } from './border/index.mjs';

let fractionMode = false;

function attachEventListeners() {
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

  const divs = document.querySelectorAll('.numbers');

  divs.forEach((div) => {
    div.addEventListener('click', toggleSelected);
    div.addEventListener('input', handleNumberInput);
    div.addEventListener('focus', handleFocus);
    div.addEventListener('click', function () {
      if (fractionMode) {
        toggleFraction(this);
        fractionMode = false;
      }
    });
  });
}

function renderDivs(numberOfDivs) {
  const parentDiv = document.querySelector('.parent');

  parentDiv.innerHTML = '';

  for (let i = 0; i < numberOfDivs; i++) {
    const div = document.createElement('div');
    div.contentEditable = 'true';
    div.innerHTML = '&nbsp;';
    div.classList.add('numbers');
    parentDiv.appendChild(div);
  }

  const firstDiv = parentDiv.firstChild;
  firstDiv.focus();

  attachEventListeners();
}

let divSize;

function setDivSize() {
  if (window.matchMedia('(max-width: 371px)').matches) {
    divSize = 20;
  } else if (window.matchMedia('(max-width: 440px)').matches) {
    divSize = 25;
  } else if (window.matchMedia('(max-width: 478px)').matches) {
    divSize = 30;
  } else if (window.matchMedia('(max-width: 612px)').matches) {
    divSize = 35;
  } else if (window.matchMedia('(max-width: 718px)').matches) {
    divSize = 45;
  } else if (window.matchMedia('(max-width: 788px)').matches) {
    divSize = 50;
  } else if (window.matchMedia('(max-width: 846px)').matches) {
    divSize = 55;
  } else if (window.matchMedia('(max-width: 914px)').matches) {
    divSize = 60;
  } else if (window.matchMedia('(max-width: 976px)').matches) {
    divSize = 65;
  } else if (window.matchMedia('(max-width: 1059px)').matches) {
    divSize = 70;
  } else {
    divSize = 75;
  }
  renderDivs(divSize);
  console.log('divSize:', divSize);
}

window.addEventListener('load', function () {
  initializeEventListeners();
  setDivSize();

  window.addEventListener('resize', setDivSize);
});
