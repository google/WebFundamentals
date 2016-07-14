function measureCRP() {
    var span = document.getElementsByTagName('span')[0];
    span.textContent = 'interactive'; // Change DOM text content.
    span.style.display = 'inline';  // Change CSSOM property.
    // Create a new element, style it, and append it to the DOM.
    var loadTime = document.createElement('div');
    loadTime.textContent = 'You loaded this page on: ' + new Date();
    loadTime.style.color = 'blue';
    document.body.appendChild(loadTime);
}
