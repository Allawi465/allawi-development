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
  if (lastFocusedDiv) {
    let nextDiv = lastFocusedDiv.nextElementSibling;
    while (nextDiv && !nextDiv.isContentEditable) {
      nextDiv = nextDiv.nextElementSibling;
    }
    if (nextDiv) {
      nextDiv.focus();
      lastFocusedDiv = nextDiv;
      setCursorAtEnd(nextDiv);
    }
  }
}

function moveToPreviousDiv() {
  if (lastFocusedDiv) {
    let prevDiv = lastFocusedDiv.previousElementSibling;
    while (prevDiv && !prevDiv.isContentEditable) {
      prevDiv = prevDiv.previousElementSibling;
    }
    if (prevDiv) {
      setCursorAtEnd(prevDiv);
      prevDiv.focus();
      lastFocusedDiv = prevDiv;
    }
  }
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

      if (lastFocusedDiv.textContent.length >= 3) {
        moveToNextDiv();
      }
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
