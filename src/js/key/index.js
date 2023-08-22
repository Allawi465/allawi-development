let Keyboard = window.SimpleKeyboard.default;
const input = document.getElementById('input');

let options = {
  onChange: (input) => onChange(input),
  onKeyPress: (button) => onKeyPress(button),
  // To keep inputs synchronized
  preventMouseDownDefault: true,
  newLineOnEnter: true,
  physicalKeyboardHighlight: true,
  syncInstanceInputs: true,
  mergeDisplay: true,
  debug: true,
};

function onKeyPress(button) {
  console.log('Button pressed', button);
  /**
   * Handle toggles
   */
  if (button === '{underline}') {
    underlineText();
    return;
  }

  if (button.includes('{') && button.includes('}')) {
    handleLayoutChange(button);
  }
  if (button === '{arrowleft}') {
    leftBtnClick();
  }
  if (button === '{arrowright}') {
    rightBtnClick();
  }
}

function onChange(input) {
  let inputElement = document.querySelector('.input');

  /**
   * Updating input's value
   */
  inputElement.value = input;
  console.log('Input changed', input);

  /**
   * Synchronizing input caret position
   */
  let caretPosition = keyboard.caretPosition;
  if (caretPosition !== null)
    setInputCaretPosition(inputElement, caretPosition);

  console.log('caretPosition', caretPosition);

  inputElement.dispatchEvent(new Event('input'));
}

function setInputCaretPosition(elem, pos) {
  if (elem.setSelectionRange) {
    elem.focus();
    elem.setSelectionRange(pos, pos);
  }
}

let keyboard = new Keyboard('.keyboard1', {
  ...options,
  theme: 'hg-theme-default myTheme1',
  layout: {
    default: [
      '{arrowleft} {arrowright}',
      '1 2 3 4 5 6 7 8 9 0',
      'q w e r t y u i o p å {bksp}',
      'a s d f g h j k l ø æ {enter}',
      '{shift} z x c v b n m , .',
      '{alt} {space} {smileys}',
    ],
    shift: [
      '{arrowleft} {arrowright}',
      '1 2 3 4 5 6 7 8 9 0',
      'Q W E R T Y U I O P Å {bksp}',
      'A S D F G H J K L Ø Æ {enter}',
      '{shiftactivated} Z X C V B N M , .',
      '{alt} {space} {smileys}',
    ],
    alt: [
      '{arrowleft} {arrowright}',
      '1 2 3 4 5 6 7 8 9 0 {bksp}',
      `@ # $ & * ( ) ' " {enter}`,
      '{shift} % - _ + = / ; : ! ? {shift}',
      '{default} {space} {smileys}',
    ],
    smileys: [
      '{arrowleft} {arrowright}',
      '😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎 {bksp}',
      `😏 😬 😭 😓 😱 😪 😬 😴 😯 {enter}`,
      '😐 😇 🤣 😘 😚 😆 😡 😥 😓 🙄',
      '{default} {space} {alt}',
    ],
  },
  display: {
    '{alt}': '.?123',
    '{smileys}': '\uD83D\uDE03',
    '{shift}': '⇧',
    '{shiftactivated}': '⇧',
    '{enter}': 'enter',
    '{bksp}': '⌫',
    '{altright}': '.?123',
    '{space}': 'space',
    '{default}': 'ABC',
    '{arrowleft}': '←', // Display a label or icon for arrow left button
    '{arrowright}': '→', // Display a label or icon for arrow right button
  },
});

let keyboard2 = new Keyboard('.keyboard2', {
  theme: 'hg-theme-default hg-layout-numeric numeric-theme',
  ...options,
  layout: {
    default: [
      '{arrowleft} {arrowright}',
      '1 2 3 4 5 6',
      '7 8 9 0 , .',
      '- + * : {underline} _',
      'x ( ) % ; =',
      '{enter} {space} {bksp}',
    ],
  },
  display: {
    '{enter}': 'enter',
    '{space}': 'space',
    '{bksp}': '⌫',
    '{arrowleft}': '←', // Display a label or icon for arrow left button
    '{arrowright}': '→', // Display a label or icon for arrow right button
    '{arrowright}': '→',
    '{underline}': '<u>2</u>',
  },
});

function handleLayoutChange(button) {
  let currentLayout = keyboard.options.layoutName;
  let layoutName;

  switch (button) {
    case '{shift}':
    case '{default}':
      layoutName = currentLayout === 'default' ? 'shift' : 'default';
      break;

    case '{alt}':
    case '{altright}':
      layoutName = currentLayout === 'alt' ? 'default' : 'alt';
      break;

    case '{smileys}':
      layoutName = currentLayout === 'smileys' ? 'default' : 'smileys';
      break;

    default:
      break;
  }

  if (layoutName) {
    keyboard.setOptions({
      layoutName: layoutName,
    });
  }
}

document.querySelector('.input').addEventListener('input', (event) => {
  keyboard.setInput(event.target.value);
});

const containerKeyboard = document.querySelector('.keyboard1');
const containerCalculator = document.querySelector('.keyboard2');
const navKeyboard = document.querySelector('.active-keyboard');
const navCalculator = document.querySelector('.active-calculator');

function keyboardBtn() {
  input.focus();
  const buttons = document.querySelectorAll('.button-boot');
  buttons.forEach((btn) => {
    btn.style.display = 'none';
  });
  containerKeyboard.style.display = 'block';
  containerCalculator.style.display = 'none';
  navKeyboard.classList.add('active');
  navCalculator.classList.remove('active');
}

document.querySelector('#keyboard-link').addEventListener('click', keyboardBtn);
document.querySelector('#keyboard-btn').addEventListener('click', keyboardBtn);

const calculatorBtn = () => {
  input.focus();
  const buttons = document.querySelectorAll('.button-boot');
  buttons.forEach((btn) => {
    btn.style.display = 'none';
  });
  containerCalculator.style.display = 'block';
  containerKeyboard.style.display = 'none';
  navCalculator.classList.add('active');
  navKeyboard.classList.remove('active');
};

document
  .querySelector('#calculator-link')
  .addEventListener('click', calculatorBtn);
document
  .querySelector('#calculator-btn')
  .addEventListener('click', calculatorBtn);

input.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = `${this.scrollHeight}px`;
});

function leftBtnClick() {
  const selectionStart = input.selectionStart;
  if (selectionStart > 0) {
    input.setSelectionRange(selectionStart - 1, selectionStart - 1);
  }
}

function rightBtnClick() {
  const selectionStart = input.selectionStart;
  if (selectionStart < input.value.length) {
    input.setSelectionRange(selectionStart + 1, selectionStart + 1);
  }
}

/* function underlineText() {
  const inputElement = document.querySelector('.input');
  const selectionStart = inputElement.selectionStart;
  const selectionEnd = inputElement.selectionEnd;

  // Wrap the selected text with underlines and line breaks
  const currentText = inputElement.value;
  const textBeforeSelection = currentText.slice(0, selectionStart);
  const selectedText = currentText.slice(selectionStart, selectionEnd);
  const textAfterSelection = currentText.slice(selectionEnd);

  // Create the underlined text with line breaks
  const underlinedText =
    textBeforeSelection + '</br>' + selectedText + '__' + textAfterSelection;

  // Update the input value with the underlined text
  inputElement.value = underlinedText;

  // Restore the selection range to include the underlined text
  inputElement.setSelectionRange(
    selectionStart + 3, // Add 3 for the length of the added underlines and line breaks
    selectionEnd + 3
  );

  // Trigger the input event to update the keyboard's input
  inputElement.dispatchEvent(new Event('input'));
}
 */