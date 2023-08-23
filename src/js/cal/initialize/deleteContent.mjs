function handleNumberInput(e) {
  if (this.innerHTML === '<br>') {
    this.innerHTML = '&nbsp;';
  }
  if (
    e.inputType === 'deleteContentBackward' ||
    e.inputType === 'deleteContentForward'
  ) {
    if (!this.textContent.trim() && e.inputType === 'deleteContentBackward') {
      let prevDiv = this.previousElementSibling;
      while (prevDiv && !prevDiv.isContentEditable) {
        prevDiv = prevDiv.previousElementSibling;
      }
      if (prevDiv) {
        setCursorAtEnd(prevDiv);
      }
      return;
    }
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

function setCursorAtEnd(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.setStart(el, el.childNodes.length);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  el.focus();
}

function handleFocus(e) {
  if (!e.target.textContent.trim()) {
    e.target.innerHTML = '&nbsp;';
  }
}

export { handleFocus, handleNumberInput };
