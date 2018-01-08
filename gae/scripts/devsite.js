'use strict';

(function() {

  function getCookieValue(name, defaultValue) {
      var value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
      return value ? value.pop() : defaultValue;
  }

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

  function initLangSelector() {
    var currentLang = getCookieValue('hl');
    var langSelector = document.querySelector('#langSelector');
    var langOptions = langSelector.querySelectorAll('option');
    langOptions.forEach(function(opt) {
      if (opt.value === currentLang) {
        opt.setAttribute('selected', true);
      }
    });
    langSelector.addEventListener('change', function(evt) {
      var newLang = langSelector.selectedOptions[0].value;
      var newUrl = window.location.origin + window.location.pathname;
      newUrl += '?hl=' + newLang;
      newUrl += window.location.hash;
      window.location = newUrl;
    });
  }

  /* Expand/Collapses the Primary Left Hand Nav */
  function toggleNav(event) {
    var srcElement = event.srcElement || event.target;
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
    var videoElements = document.querySelectorAll('iframe.devsite-embedded-youtube-video');
    videoElements.forEach(function(elem) {
      var videoID = elem.getAttribute('data-video-id');
      if (videoID) {
        var videoURL = 'https://www.youtube.com/embed/' + videoID;
        videoURL += '?autohide=1&amp;showinfo=0&amp;enablejsapi=1';
        elem.src = videoURL;
      }
    });
  }

  function initFeed() {
    var placeholderTitle = 'RSS Feed Widget is not supported.';
    var placeholderText = 'The RSS Feed Widget is <b>NOT</b> supported in the ';
    placeholderText += 'local development environment. Sorry. ';
    placeholderText += 'Lorem ipsum dolor sit amet, perfecto volutpat prodesset duo ei. Per ne albucius consulatu. Graece repudiandae ut vis. Quot omnis vix ad, prodesset consetetur persequeris ea mel. Nostrum urbanitas usu eu, qui id graeci facilisi.';
    var feedElements = document.querySelectorAll('div.feed.hfeed:not(.rendered)');
    feedElements.forEach(function(elem) {
      elem.querySelector('article.hentry').style.display = 'block';
      elem.querySelector('header').textContent = placeholderTitle;
      elem.querySelector('.entry-content').innerHTML = placeholderText;
      elem.querySelector('.published').textContent = 'January 1st, 2016';
    });
  }

  initNavToggles();
  highlightActiveNavElement();
  initYouTubeVideos();
  initFeed();
  initLangSelector();
})();
