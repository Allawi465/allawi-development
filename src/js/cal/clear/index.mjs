function clearAllDivs() {
  localStorage.clear();
  const divs = document.querySelectorAll('.numbers, .fraction');

  divs.forEach((div) => {
    div.textContent = '';
    div.classList.remove(
      'double-border',
      'single-border',
      'selected',
      'active'
    );

    // Add this line to set the contenteditable attribute to 'true'
    div.setAttribute('contenteditable', 'true');
  });
}

export { clearAllDivs };
