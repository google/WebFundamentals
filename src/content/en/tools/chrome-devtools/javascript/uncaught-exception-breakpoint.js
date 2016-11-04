var nodes = {};
nodes.button = document.querySelector('button');
nodes.num = document.querySelector('span');
nodes.button.addEventListener('click', function onClick() {
  nodes.number.textContent = Math.random();
});
