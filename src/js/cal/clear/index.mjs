function clearAllDivs() {
  localStorage.clear();
  const divs = document.querySelectorAll('.numbers, .fraction');

  divs.forEach((div) => {
    div.textContent = '';
    div.classList.remove('single-line', 'double-line', 'selected', 'active');

    div.setAttribute('contenteditable', 'true');
  });
}

function clearSelectedDivs() {
  const selectedDivs = document.querySelectorAll('.numbers.selected');

  selectedDivs.forEach((div) => {
    div.classList.remove('selected');
  });
}

export { clearAllDivs, clearSelectedDivs };
