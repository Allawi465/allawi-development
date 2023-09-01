function applyBorderToDivs(borderClass) {
  const divs = document.querySelectorAll('.numbers.selected');

  divs.forEach((div) => {
    if (div.classList.contains(borderClass)) {
      div.classList.remove(borderClass);
    } else {
      div.classList.remove('double-line', 'single-line');
      div.classList.add(borderClass);
    }
  });
}
export { applyBorderToDivs };
