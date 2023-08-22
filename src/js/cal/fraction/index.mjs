import { handleNumberInput } from '../initialize/calBtns.mjs';

function toggleFraction(divElement) {
  if (divElement.querySelector('.fraction')) {
    divElement.innerHTML = '';
    divElement.setAttribute('contenteditable', 'true');
    divElement.addEventListener('input', handleNumberInput);
  } else {
    divElement.innerHTML = `
      <div class="fraction">
          <span class="numerator" contenteditable="true"></span>
          <span class="divider"></span>
          <span class="denominator" contenteditable="true"></span>
      </div>
    `;
    divElement.removeEventListener('input', handleNumberInput);
    divElement.setAttribute('contenteditable', 'false');

    const numerator = divElement.querySelector('.numerator');
    const denominator = divElement.querySelector('.denominator');

    numerator.addEventListener('input', function () {
      if (this.textContent.length >= 3) {
        this.textContent = this.textContent.slice(0, 3);
        denominator.focus();
      }
    });

    denominator.addEventListener('input', function () {
      if (this.textContent.length >= 3) {
        this.textContent = this.textContent.slice(0, 3);
        let nextDiv = divElement.nextElementSibling;
        while (nextDiv && !nextDiv.isContentEditable) {
          nextDiv = nextDiv.nextElementSibling;
        }
        if (nextDiv) {
          nextDiv.focus();
        }
      }
    });

    numerator.focus();
  }
}

export { toggleFraction };
