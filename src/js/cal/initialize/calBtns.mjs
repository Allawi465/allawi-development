import { setCursorAtEnd } from './deleteContent.mjs';
let lastFocusedDiv = null;

function getFocusedNumberDiv() {
  const editableElements = document.querySelectorAll(
    '.numbers, .numerator, .denominator'
  );
  for (let elem of editableElements) {
    if (document.activeElement === elem) {
      return elem;
    }
  }
  return null;
}

function moveToNextDiv() {
  let nextDiv = null;

  if (lastFocusedDiv.classList.contains('denominator')) {
    nextDiv = lastFocusedDiv.closest('.numbers').nextElementSibling;
  } else {
    nextDiv = lastFocusedDiv.nextElementSibling;
  }

  while (nextDiv && !isContentEditable(nextDiv)) {
    nextDiv = nextDiv.nextElementSibling;
  }

  if (nextDiv) {
    let targetDiv = nextDiv.querySelector('.numerator') || nextDiv;
    targetDiv.focus();
    lastFocusedDiv = targetDiv;
    setCursorAtEnd(targetDiv);
  }
}

function moveToPreviousDiv() {
  let prevDiv = null;

  if (lastFocusedDiv.classList.contains('numerator')) {
    prevDiv = lastFocusedDiv.closest('.numbers').previousElementSibling;
  } else {
    prevDiv = lastFocusedDiv.previousElementSibling;
  }

  while (prevDiv && !isContentEditable(prevDiv)) {
    prevDiv = prevDiv.previousElementSibling;
  }

  if (prevDiv) {
    let targetDiv = prevDiv.querySelector('.denominator') || prevDiv;
    targetDiv.focus();
    lastFocusedDiv = targetDiv;
    setCursorAtEnd(targetDiv);
  }
}

function handleInputLimit(elem) {
  if (elem.textContent.length >= 3) {
    elem.textContent = elem.textContent.slice(0, 3);
    moveToNextDiv();
  }
}

function isContentEditable(element) {
  return (
    element.isContentEditable ||
    element.querySelector('[contenteditable="true"]')
  );
}

function initializeEventListeners() {
  document.addEventListener('mousedown', function (e) {
    const currentlyFocusedDiv = getFocusedNumberDiv();
    if (currentlyFocusedDiv) {
      lastFocusedDiv = currentlyFocusedDiv;
    }
  });

  document.addEventListener('click', function (e) {
    if (
      e.target.classList.contains('button') &&
      e.target.textContent !== '←' &&
      e.target.textContent !== '→' &&
      e.target.id !== 'space' &&
      e.target.id !== 'deleting' &&
      lastFocusedDiv
    ) {
      lastFocusedDiv.textContent += e.target.textContent;
      lastFocusedDiv.textContent = lastFocusedDiv.textContent.trim();

      handleInputLimit(lastFocusedDiv);
    }
  });

  document.getElementById('left').addEventListener('click', moveToPreviousDiv);
  document.getElementById('right').addEventListener('click', moveToNextDiv);

  document.getElementById('space').addEventListener('click', function () {
    if (lastFocusedDiv) {
      lastFocusedDiv.textContent += ' ';
      if (lastFocusedDiv.textContent.length > 3) {
        lastFocusedDiv.textContent = lastFocusedDiv.textContent.slice(0, 3);
        moveToNextDiv();
      }
    }
  });

  document.getElementById('deleting').addEventListener('click', function () {
    if (lastFocusedDiv) {
      lastFocusedDiv.textContent = lastFocusedDiv.textContent.slice(0, -1);

      if (!lastFocusedDiv.textContent.trim()) {
        lastFocusedDiv.innerHTML = '&nbsp;';
        moveToPreviousDiv();
      }
    }
  });
}

export { initializeEventListeners };
