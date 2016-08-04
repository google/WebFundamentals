'use strict';

(function() {

  function initNavToggles() {
    var elems = document
      .querySelectorAll('.devsite-section-nav .devsite-nav-item-section-expandable');
    elems.forEach(function(elem) {
      var span = elem.querySelector('span');
      span.addEventListener('click', toggleNav);
      var link = elem.querySelector('a.devsite-nav-toggle');
      link.addEventListener('click', toggleNav);
    });
  }

  /* Expand/Collapses the Primary Left Hand Nav */
  function toggleNav(event) {
    var srcElement = event.srcElement;
    var srcParent = srcElement.parentElement;
    // Ensure's we're in the outer most <span>
    if (srcElement.localName === 'span' && srcParent.localName === 'span') {
      srcElement = srcElement.parentElement;
      srcParent = srcElement.parentElement;
    }
    // Grabs the anchor and the UL so we can update them
    var anchor = srcParent.querySelector('a.devsite-nav-toggle');
    var ul = srcParent.querySelector('ul.devsite-nav-section');
    // Toggles the expanded/collapsed classes
    anchor.classList.toggle('devsite-nav-toggle-expanded');
    anchor.classList.toggle('devsite-nav-toggle-collapsed');
    ul.classList.toggle('devsite-nav-section-collapsed');
    ul.classList.toggle('devsite-nav-section-expanded');
  }

  function highlightActiveNavElement() {
    var elems = document.querySelectorAll('.devsite-section-nav a.devsite-nav-title');
    var currentURL = window.location.pathname;
    for (var i = 0; i < elems.length; i++) {
      var elem = elems[i];
      if (currentURL === elem.getAttribute('href')) {
        var parentLI = elem.parentElement;
        if (parentLI.localName === 'li') {
          parentLI.classList.add('devsite-nav-active');
          expandPathAndHighlight(parentLI);
          break;
        }
      }
    }
  }

  function expandPathAndHighlight(elem) {
    // Walks up the tree from the current element and expands all tree nodes
    var parent = elem.parentElement;
    var parentIsCollapsed = parent.classList.contains('devsite-nav-section-collapsed');
    if (parent.localName === 'ul' && parentIsCollapsed) {
      parent.classList.toggle('devsite-nav-section-collapsed');
      parent.classList.toggle('devsite-nav-section-expanded');
      // Checks if the grandparent is an expandable element
      var grandParent = parent.parentElement;
      var grandParentIsExpandable = grandParent.classList.contains('devsite-nav-item-section-expandable');
      if (grandParent.localName === 'li' && grandParentIsExpandable) {
        var anchor = grandParent.querySelector('a.devsite-nav-toggle');
        anchor.classList.toggle('devsite-nav-toggle-expanded');
        anchor.classList.toggle('devsite-nav-toggle-collapsed');
        expandPathAndHighlight(grandParent);
      }
    }
  }

  function initYouTubeVideos() {
    var videoElements = document.querySelectorAll('.video-wrapper > iframe');
    videoElements.forEach(function(elem) {
      var videoID = elem.getAttribute('data-video-id');
      if (videoID) {
        var videoURL = 'https://www.youtube.com/embed/' + videoID;
        videoURL += '?autohide=1&amp;showinfo=0&amp;enablejsapi=1';
        elem.src = videoURL;
      }
    });
  }

  initNavToggles();
  highlightActiveNavElement();
  initYouTubeVideos();
})();
