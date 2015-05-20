function Item(x) {
  this.x = x;
}

function numbers() {
  var result = new Array(10000);
  for (var i = 0, l = result.length; i < l; ++i)
    result[i] = new Item(i);
  return new Item(result);
}

function strings() {
  var result = new Array(10000);
  for (var i = 0, l = result.length; i < l; ++i)
    result[i] = new Item(i.toString());
  return new Item(result);
}

function init() {
  numberCache = numbers();
  stringCache = strings();
  documentCache = new Item(document.body.textContent.toLowerCase());
}