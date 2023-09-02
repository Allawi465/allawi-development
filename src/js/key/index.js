var trixEditor = document.querySelector('trix-editor');
const imathContainer = document.querySelector('.keyContainer');
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
keyboard.setAttribute('id', 'keyboard');
imathContainer.appendChild(keyboard);

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    keyboard.appendChild(this.elements.keysContainer);
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      'backspace',
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      'å',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'ø',
      'æ',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      ',',
      '.',
      '?',
      'caps',
      'space',
      'enter',
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            // Make sure to get trixEditor here so that it's freshly initialized
            const trixElement = document.querySelector('trix-editor');
            const trixEditor = trixElement ? trixElement.editor : null;

            if (trixEditor) {
              trixElement.focus();

              // Delete last character in your properties
              this.properties.value = this.properties.value.substring(
                0,
                this.properties.value.length - 1
              );

              // Now, delete the last character in the Trix editor
              const position = trixEditor.getPosition(); // get the current cursor position
              trixEditor.setSelectedRange([position - 1, position]); // select the last character
              trixEditor.deleteInDirection('backward'); // delete the selection

              this._triggerEvent('oninput');
            } else {
              console.error('Trix editor is not available');
            }
          });

          break;

        case 'caps':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable'
          );
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              'keyboard__key--active',
              this.properties.capsLock
            );
          });

          break;

        case 'enter':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--height'
          );
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            // Update your own state
            this.properties.value += '\n';
            this._triggerEvent('oninput');

            // Insert newline into the Trix editor
            const editor = document.querySelector('trix-editor').editor;
            editor.insertString('\n');
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            // Update your own state
            this.properties.value += ' ';
            this._triggerEvent('oninput');

            // Insert a space into the Trix editor
            const editor = document.querySelector('trix-editor').editor;
            editor.insertString(' ');
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            trixEditor.focus();
            const text = this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this.properties.value += text;
            this._triggerEvent('oninput');

            // Insert text into the Trix editor
            const editor = trixEditor.editor;
            editor.insertString(text);
          });

          break;
      }

      fragment.appendChild(keyElement);
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },
};

document.addEventListener('trix-initialize', function (event) {
  var trixEditor = document.querySelector('trix-editor');
  if (trixEditor && trixEditor.editor) {
    console.log(trixEditor.editor);
    trixEditor.editor.recordUndoEntry('Insert Text');
  }
});

document.addEventListener('DOMContentLoaded', function (event) {
  Keyboard.init();
});
