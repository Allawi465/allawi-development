let Keyboard = window.SimpleKeyboard.default;
let input = document.getElementById('input');
const trixEditor = document.querySelector('trix-editor');

let options = {
  onChange: (input) => onChange(input),
  onKeyPress: (button) => onKeyPress(button),
  // To keep inputs synchronized
  preventMouseDownDefault: true,
  newLineOnEnter: true,
  physicalKeyboardHighlight: true,
  syncInstanceInputs: true,
  mergeDisplay: false,
  debug: false,
};

function onKeyPress(button) {
  if (button === '{underline}') {
    underlineText();
    return;
  }

  if (button.includes('{') && button.includes('}')) {
    handleLayoutChange(button);
  }
}

function onChange(input) {
  let inputElement = document.getElementById('input');

  trixEditor.editor.loadHTML(input);

  inputElement.value = input;

  inputElement.dispatchEvent(new Event('input'));
}

let keyboard = new Keyboard('.keyboard1', {
  ...options,
  theme: 'hg-theme-default myTheme1',
  layout: {
    default: [
      '1 2 3 4 5 6 7 8 9 0',
      'q w e r t y u i o p å {bksp}',
      'a s d f g h j k l ø æ {enter}',
      '{shift} z x c v b n m , .',
      '{alt} {space} {smileys}',
    ],
    shift: [
      '1 2 3 4 5 6 7 8 9 0',
      'Q W E R T Y U I O P Å {bksp}',
      'A S D F G H J K L Ø Æ {enter}',
      '{shiftactivated} Z X C V B N M , .',
      '{alt} {space} {smileys}',
    ],
    alt: [
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
