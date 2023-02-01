

let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  theme: "hg-theme-default hg-theme-ios",
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
    ]
  },
  display: {
    "{alt}": ".?123",
    "{smileys}": "\uD83D\uDE03",
    "{shift}": "⇧",
    "{shiftactivated}": "⇧",
    "{enter}": "enter",
    "{bksp}": "⌫",
    "{altright}": ".?123",
    "{space}": " ",
    "{default}": "ABC",
  }
});

document.querySelectorAll(".input").forEach(input => {
    input.addEventListener("focus", onInputFocus);
    // Optional: Use if you want to track input changes
    // made without simple-keyboard
    input.addEventListener("input", onInputChange);
});
  
function onInputFocus(event) {
    selectedInput = `#${event.target.id}`;
  
    keyboard.setOptions({
      inputName: event.target.id
    });
}
  
function onInputChange(event) {
    keyboard.setInput(event.target.value, event.target.id);
}
  
function onChange(input) {
    console.log("Input changed", input);
    document.querySelector(selectedInput || ".input").value = input;
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
    case "{shiftactivated}":
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

const kalkulatorBtn = document.getElementById("kalkulator").addEventListener("click", () => {

});
const tastaturBtn = document.getElementById("tastatur").addEventListener("click", () => {
  const container = document.querySelector(".keyboardContainer");
  const buttons = document.querySelectorAll(".button-boot");
  buttons.forEach(btn => {
    btn.style.display = "none";
  })
  container.style.display = "block";
});


