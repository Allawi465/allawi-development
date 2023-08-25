import Trix from 'trix';
document.addEventListener('trix-initialize', function (event) {
  var editor = event.target;
  console.log('Trix editor initialized on', editor);
});
