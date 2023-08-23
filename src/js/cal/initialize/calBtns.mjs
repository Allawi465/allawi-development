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

export { initializeEventListeners };
