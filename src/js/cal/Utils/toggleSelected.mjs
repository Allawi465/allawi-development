function toggleSelected(e) {
  const currentDiv = e.currentTarget;

  if (currentDiv.classList.contains('selected')) {
    currentDiv.classList.remove('selected');
  } else {
    currentDiv.classList.add('selected');
  }
}

export { toggleSelected };
