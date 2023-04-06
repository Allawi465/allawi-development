

let Keyboard = window.SimpleKeyboard.default;
const input = document.getElementById('input');

let options = {
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),

  // To keep inputs syncronized
  mergeDisplay: true,
  syncInstanceInputs: true,
  preventMouseDownDefault: true,
  newLineOnEnter: true,
};

let keyboard = new Keyboard(".keyboard1", {
  ...options,
  theme: "hg-theme-default myTheme1",
  layout: {
    default: [
      "1 2 3 4 5 6 7 8 9 0",
      "q w e r t y u i o p å {bksp}",
      "a s d f g h j k l ø æ {enter}",
      "{shift} z x c v b n m , .",
      "{alt} {space} {smileys}"
    ],
    shift: [
      "1 2 3 4 5 6 7 8 9 0",
      "Q W E R T Y U I O P Å {bksp}",
      "A S D F G H J K L Ø Æ {enter}",
      "{shiftactivated} Z X C V B N M , .",
      "{alt} {space} {smileys}"
    ],
    alt: [
      "1 2 3 4 5 6 7 8 9 0 {bksp}",
      `@ # $ & * ( ) ' " {enter}`,
      "{shift} % - _ + = / ; : ! ? {shift}",
      "{default} {space} {smileys}"
    ],
    smileys: [
      "😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎 {bksp}",
      `😏 😬 😭 😓 😱 😪 😬 😴 😯 {enter}`,
      "😐 😇 🤣 😘 😚 😆 😡 😥 😓 🙄",
      "{default} {space} {alt}"
    ],
  },
  display: {
    "{alt}": ".?123",
    "{smileys}": "\uD83D\uDE03",
    "{shift}": "⇧",
    "{shiftactivated}": "⇧",
    "{enter}": "enter",
    "{bksp}": "⌫",
    "{altright}": ".?123",
    "{space}": "space",
    "{default}": "ABC",
  },
});

let keyboard2 = new Keyboard(".keyboard2", {
  theme: "hg-theme-default hg-layout-numeric numeric-theme",
  ...options,
  layout: {
    default: ["1 2 3 4", "4 5 6 7", "8 9 0 =", "- + * : %", "{bksp}"],
  },
});

document.querySelector(".input").addEventListener("input", event => {
  keyboard.setInput(event.target.value);
});

console.log(keyboard);

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);

  /**
   * Handle toggles
   */
  if (button.includes("{") && button.includes("}")) {
    handleLayoutChange(button);
  }
}

function handleLayoutChange(button) {
  let currentLayout = keyboard.options.layoutName;
  let layoutName;

  switch (button) {
    case "{shift}":
    case "{default}":
      layoutName = currentLayout === "default" ? "shift" : "default";
      break;

    case "{alt}":
    case "{altright}":
      layoutName = currentLayout === "alt" ? "default" : "alt";
      break;

    case "{smileys}":
      layoutName = currentLayout === "smileys" ? "default" : "smileys";
      break;

    default:
      break;
  }

  if (layoutName) {
    keyboard.setOptions({
      layoutName: layoutName
    });
  }
}

const containerKeyboard = document.querySelector(".keyboard1");
const containerCalculator = document.querySelector(".keyboard2");
const navKeyboard = document.querySelector(".active-keyboard");
const navCalculator = document.querySelector(".active-calculator");

const keyboardBtn = () => {
  input.focus();
  const buttons = document.querySelectorAll(".button-boot");
  buttons.forEach(btn => {
    btn.style.display = "none";
  })
  containerKeyboard.style.display = "block";
  containerCalculator.style.display = "none";
  navKeyboard.classList.add("active");
  navCalculator.classList.remove("active");
};

document.querySelector("#keyboard-link").addEventListener("click", keyboardBtn);
document.querySelector("#keyboard-btn").addEventListener("click", keyboardBtn);


const calculatorBtn = () => {
  input.focus();
  const buttons = document.querySelectorAll(".button-boot");
  buttons.forEach(btn => {
    btn.style.display = "none";
  })
  containerCalculator.style.display = "block";
  containerKeyboard.style.display = "none";
  navCalculator.classList.add("active");
  navKeyboard.classList.remove("active");
};


document.querySelector("#calculator-link").addEventListener("click", calculatorBtn);
document.querySelector("#calculator-btn").addEventListener("click", calculatorBtn);


const upBtn = document.getElementById('up-btn');
upBtn.addEventListener('click', () => {
  const selectionStart = input.selectionStart;
  const value = input.value;
  const previousLineEnd = value.lastIndexOf('\n', selectionStart - 2);
  const previousLineStart = value.lastIndexOf('\n', previousLineEnd - 1);
  
  // calculate the new cursor position
  let newCursorPosition;
  if (previousLineEnd !== -1) {
    const lineLength = selectionStart - previousLineEnd;
    const previousLineLength = previousLineEnd - previousLineStart;
    newCursorPosition = Math.min(selectionStart - lineLength, previousLineStart + lineLength + Math.min(lineLength, previousLineLength));
  } else {
    newCursorPosition = 0;
  }
  
  // set the new cursor position
  input.setSelectionRange(newCursorPosition, newCursorPosition);
});
const downBtn = document.getElementById('down-btn');
downBtn.addEventListener('click', () => {
  const selectionStart = input.selectionStart;
  const value = input.value;
  const currentPosition = value.lastIndexOf('\n', selectionStart - 2);
  const nextLine = value.indexOf('\n', selectionStart);
  if (nextLine !== -1) {
    input.setSelectionRange(nextLine + (selectionStart - currentPosition), nextLine + (selectionStart - currentPosition));
  } else {
    input.setSelectionRange(value.length, value.length);
  }
});

const leftBtn = document.getElementById('left-btn');
leftBtn.addEventListener('click', () => {
  const selectionStart = input.selectionStart;
  if (selectionStart > 0) {
    input.setSelectionRange(selectionStart - 1, selectionStart - 1);
  }
});

const rightBtn = document.getElementById('right-btn');
rightBtn.addEventListener('click', () => {
  const selectionStart = input.selectionStart;
  if (selectionStart < input.value.length) {
    input.setSelectionRange(selectionStart + 1, selectionStart + 1);
  }
});