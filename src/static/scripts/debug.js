'use strict';

export default class Debug {

  constructor() {
    this.enableRemoteStyles = true;
    this.gridColorCurrentVariant = null;
    this.gridColorVariants = ['dark', 'light'];

    // This enables the ability for external styleguide
    // to call down into this page and control debug
    // parameters
    window.addEventListener('message', function(e) {
      if (e.data.action !== 'cmd') {
        return;
      }

      if (this[e.data.functionName]) {
        this[e.data.functionName](e.data.variable);
      } else {
        console.log('Debug received message, no method to handle it however.',
          e.data);
      }
    }.bind(this));
  }

  get debugLink() {
    return this.debugLink_;
  }

  // Check if the grid is currently visible
  isBaselineGridEnabled() {
    return this.debugLink !== null;
  }

  // Change the current baseline grid color variant
  setVariantClass(newVariant) {
    switch (newVariant) {
      case 'light':
        this.debugLink.href = 'http://basehold.it/24/FFFFFF';
        break;
      case 'dark':
        this.debugLink.href = 'http://basehold.it/24/000000';
        break;
    }

    this.gridColorCurrentVariant = newVariant;
  }

  showBaselineGrid() {
    if (this.debugLink) {
      return;
    }

    var linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('type', 'text/css');
    linkElement.setAttribute('id', 'debug-link-wf');

    document.getElementsByTagName('head')[0].appendChild(linkElement);
    this.debugLink_ = linkElement;
  }

  hideBaselineGrid() {
    console.log(this.debugLink);
    console.log(this.debugLink.parentNode);
    this.debugLink.parentNode.removeChild(this.debugLink);
    this.debugLink_ = null;
  }

  setEnableBaselineGrid(enable) {
    if (enable) {
      this.showBaselineGrid();
    } else {
      this.hideBaselineGrid();
    }
  }

  // This will toggle through the grid variants for each call
  // and hide the grid if a full loop of variants is done
  toggleBaselineGrid() {
    var indexOfCurrentVariant = this.gridColorVariants.indexOf(
      this.gridColorCurrentVariant);
    if ((indexOfCurrentVariant + 1) >= this.gridColorVariants.length) {
      this.setVariantClass(null);
      this.setEnableBaselineGrid(false);
      return;
    }
    indexOfCurrentVariant = indexOfCurrentVariant + 1;
    this.setEnableBaselineGrid(true);
    this.setVariantClass(this.gridColorVariants[indexOfCurrentVariant]);
  }

  // This will enable and disable remote CSS stylesheets
  toggleRemoteStyles() {
    this.enableRemoteStyles = !this.enableRemoteStyles;
    var media = this.enableRemoteStyles ? 'all' : 'only x';
    var sheets = document.styleSheets;
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].href) {
        sheets[i].disabled = !this.enableRemoteStyles;
      }
    }
  }

}
