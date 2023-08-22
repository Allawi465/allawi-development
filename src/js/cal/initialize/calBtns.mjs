let lastFocusedDiv = null;

function handleNumberInput(e) {
  if (
    e.inputType === 'deleteContentBackward' ||
    e.inputType === 'deleteContentForward'
  ) {
    return;
  }

  if (this.textContent.length > 3) {
    this.textContent = this.textContent.slice(0, 3);

    let nextDiv = this.nextElementSibling;
    while (nextDiv && !nextDiv.isContentEditable) {
      nextDiv = nextDiv.nextElementSibling;
    }
    if (nextDiv) {
      nextDiv.focus();
    }
  }
}

function handleFocus(e) {
  if (!e.target.textContent.trim()) {
    e.target.innerHTML = '&nbsp;';
  }
}

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

function initializeEventListeners() {
  document.addEventListener('mousedown', function (e) {
    const currentlyFocusedDiv = getFocusedNumberDiv();
    if (currentlyFocusedDiv) {
      lastFocusedDiv = currentlyFocusedDiv;
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('button') && lastFocusedDiv) {
      lastFocusedDiv.textContent += e.target.textContent;
      lastFocusedDiv.textContent = lastFocusedDiv.textContent.trim();
      console.log(lastFocusedDiv);

      if (lastFocusedDiv.textContent.length > 3) {
        lastFocusedDiv.textContent = lastFocusedDiv.textContent.slice(0, 3);

        let nextDiv = lastFocusedDiv.closest('.numbers').nextElementSibling;
        console.log(nextDiv);
        while (nextDiv && !nextDiv.isContentEditable) {
          nextDiv = nextDiv.nextElementSibling;
        }
        if (nextDiv) {
          nextDiv.focus();
          lastFocusedDiv = nextDiv;
        }
      } else {
        lastFocusedDiv.focus();
      }
    }
  });
}

export { initializeEventListeners, handleFocus, handleNumberInput };
